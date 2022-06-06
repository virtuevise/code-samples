using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using sk_travel.DAL.Context;
using sk_travel.DAL.Tables;
using sk_travel.Model;
using System;
using System.Net;
using System.Text.Json;

namespace sk_travel.Services
{
    public class AdminService
    {
        private readonly UserManager<UserTbl> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly TableContext _tblctx;
        public AdminService(UserManager<UserTbl> userManager, RoleManager<IdentityRole> roleManager, TableContext tblCtx)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _tblctx = tblCtx;
        }

        public async Task<ResponseModel> getAllRole()
        {
            ResponseModel Response = new ();
            try
            {
                var roleExists = await roleManager.Roles.ToListAsync();
                if (roleExists.Count > 0)
                {
                    Response.Data = roleExists;
                    Response.Message = "Successfully Fetched";
                    Response.StatusCode = HttpStatusCode.OK;
                }
            }
            catch (Exception exp)
            {
                Response.Message = exp.Message;
                Response.StatusCode = HttpStatusCode.InternalServerError;

            }
            return Response;
        }


        public async Task<ResponseModel> getRoleModule()
        {
            ResponseModel Response = new ();
            try
            {
                var result = await (from a in roleManager.Roles
                                    join b in _tblctx.Sk_RoleModuleMapping on a.Id equals b.RoleId.ToString()
                                    group new { a, b } by new { a.Id, b.RoleId, a.Name } into grp
                                    select new
                                    {
                                        roleName = grp.Key.Name,
                                        roleId = grp.Key.RoleId
                                    }).ToListAsync();


                var details = result.Select(x => new
                {
                    roleName = x.roleName,
                    modules = String.Join(",", (from a in _tblctx.Sk_RoleModuleMapping
                                                join b in _tblctx.Sk_VeiwModuleTbl on a.Sk_VeiwModuleTblid equals b.id
                                                where a.RoleId == x.roleId && a.IsActive == true && a.IsDeleted == false
                                                select b.ModuleName
                                                
                                  ).ToList()),
                    DisplayName = String.Join(", ", (from a in _tblctx.Sk_RoleModuleMapping
                                                    join b in _tblctx.Sk_VeiwModuleTbl on a.Sk_VeiwModuleTblid equals b.id
                                                    where a.RoleId == x.roleId && a.IsActive == true && a.IsDeleted == false
                                                    select b.DisplayName
                                                  
                                  ).ToList())
                }); ;
                if (details is not null)
                {
                    Response.Data = details;
                    Response.Message = "Successfully Fetched";
                    Response.StatusCode = HttpStatusCode.OK;
                }
            }
            catch (Exception exp)
            {
                Response.Message = exp.Message;
                Response.StatusCode = HttpStatusCode.InternalServerError;

            }
            return Response;
        }

        public async Task<ResponseModel> getAllModule()
        {
            ResponseModel Response = new ();
            try
            {
                var isExist = await _tblctx.Sk_VeiwModuleTbl.Where(c => c.IsActive == true && c.IsDeleted == false).Select(c => new { c.id, c.ModuleName, c.DisplayName }).ToListAsync();
                if (isExist is not null)
                {
                    Response.Data = isExist;
                    Response.Message = "Successfully fetched";
                    Response.StatusCode = HttpStatusCode.OK;
                }
            }
            catch (Exception exp)
            {
                Response.Message = exp.Message;
                Response.StatusCode = HttpStatusCode.InternalServerError;
            }
            return Response;
        }

        public async Task<ResponseModel> addRoleValidation(RoleModel model)
        {
            ResponseModel Response = new ();
            try
            {
                var roleExists = await roleManager.RoleExistsAsync(model.RoleName.ToLower().Trim());
                if (!roleExists)
                {
                    var newRole = new IdentityRole(model.RoleName.ToLower().Trim())
                    {
                        Name = model.RoleName.ToLower().Trim(),
                        NormalizedName = model.RoleName.ToUpper().Trim(),
                    };
                    await roleManager.CreateAsync(newRole);
                    Thread.Sleep(500);
                }
                var role = await roleManager.FindByNameAsync(model.RoleName.ToLower().Trim());
                var isModuleExist = await _tblctx.Sk_RoleModuleMapping.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.RoleId == new Guid(role.Id.ToString()));
                if (isModuleExist is null)
                {
                    var veiwModule = await _tblctx.Sk_VeiwModuleTbl.Select(c => new { c.id, c.ModuleName }).ToListAsync();
                    var modules = model.Module.Select(c => c.Module).ToList();
                    for (int i = 0; i < veiwModule.Count; i++)
                    {
                        for (int j = 0; j < modules.Count; j++)
                        {
                            if (veiwModule[i].ModuleName == modules[j])
                            {
                                Sk_RoleModuleMapping moduleMap = new Sk_RoleModuleMapping()
                                {
                                    RoleId = new Guid(role.Id.ToString()),
                                    Sk_VeiwModuleTblid = new Guid(veiwModule[i].id.ToString())
                                };
                                _tblctx.Sk_RoleModuleMapping.Add(moduleMap);
                                break;
                            }
                        }

                    }
                    var isSaved = await _tblctx.SaveChangesAsync();
                    if (isSaved > 0)
                    {
                        Response.Message = "Successfully added";
                        Response.StatusCode = HttpStatusCode.OK;
                    }

                }
                else
                {
                    Response.Message = "Already Exist";
                    Response.StatusCode = HttpStatusCode.BadRequest;
                }
            }
            catch (Exception exp)
            {

                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }

        public async Task<ResponseModel> updateRoleValidation(RoleModel model)
        {
            ResponseModel Response = new ();
            try
            {
                var role = await roleManager.FindByIdAsync(model.Id);
                role.Name = model.RoleName.ToLower().Trim();
                await roleManager.UpdateAsync(role);
                var isModuleExist = await _tblctx.Sk_RoleModuleMapping.Where(c => c.IsActive == true && c.IsDeleted == false && c.RoleId == new Guid(role.Id.ToString())).ToListAsync();
                var modules = model.Module.Select(c => c.Module).ToList();
                List<string> moduleId = new List<string>();
                for (int i = 0; i < modules.Count; i++)
                {
                    var id = await _tblctx.Sk_VeiwModuleTbl.FirstOrDefaultAsync(c => c.ModuleName == modules[i]);
                    moduleId.Add(id.id.ToString());
                }

                var allmodules = await _tblctx.Sk_RoleModuleMapping.Where(c => c.RoleId == new Guid(role.Id)).ToListAsync();
                foreach (var item in allmodules)
                {
                    item.IsActive = false;
                    item.IsDeleted = true;
                    _tblctx.Sk_RoleModuleMapping.Update(item);
                }
                var isDeletedSaved = await _tblctx.SaveChangesAsync();

                for (int i = 0; i < moduleId.Count; i++)
                {
                    var isExist = await _tblctx.Sk_RoleModuleMapping.FirstOrDefaultAsync(c => c.Sk_VeiwModuleTblid == new Guid(moduleId[i]) && c.RoleId == new Guid(role.Id));
                    if (isExist is not null)
                    {
                        isExist.IsActive = true;
                        isExist.IsDeleted = false;
                        _tblctx.Sk_RoleModuleMapping.Update(isExist);
                    }
                    else
                    {
                        Sk_RoleModuleMapping moduleMap = new Sk_RoleModuleMapping()
                        {
                            RoleId = new Guid(role.Id.ToString()),
                            Sk_VeiwModuleTblid = new Guid(moduleId[i])
                        };
                        _tblctx.Sk_RoleModuleMapping.Add(moduleMap);
                    }
                }

                var isSaved = await _tblctx.SaveChangesAsync();
                if (isSaved > 0)
                {
                    Response.Message = "Updated Successfully";
                    Response.StatusCode = HttpStatusCode.OK;
                }

            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }


        public async Task<ResponseModel> deleteRoleValidation(string id)
        {
            ResponseModel Response = new ();
            try
            {
                var role = await roleManager.FindByIdAsync(id);
                var result = await roleManager.DeleteAsync(role);
                var isExist = await _tblctx.Sk_RoleModuleMapping.Where(c => c.RoleId == new Guid(id)).ToListAsync();
                if (isExist != null)
                {
                    foreach (var item in isExist)
                    {
                        _tblctx.Sk_RoleModuleMapping.Remove(item);
                    }
                    var isSaved = await _tblctx.SaveChangesAsync();
                    if (isSaved > 0)
                    {
                        Response.Message = "Successfully Deleted";
                        Response.StatusCode = HttpStatusCode.OK;
                    }
                }
                else
                {
                    Response.StatusCode = HttpStatusCode.BadRequest;
                }
            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }
        public async Task<ResponseModel> GetAllUser()
        {
            ResponseModel Response = new ();
            try
            {

                var allUser = await userManager.Users.ToListAsync();


                List<User> userList = new List<User>();

                foreach (var users in allUser)
                {
                    var roles = await userManager.GetRolesAsync(users);

                    User allUsers = new User();
                    allUsers.Id = users.Id;
                    allUsers.FirstName = users.FirstName;
                    allUsers.LastName = users.LastName;
                    allUsers.Contact = users.PhoneNumber;
                    allUsers.Email = users.Email;
                    if (roles.Count > 0)
                    {
                        allUsers.Role = roles[0];
                    }
                    else
                    {
                        allUsers.Role = null;
                    }
                    userList.Add(allUsers);
                }
                if (userList.Count > 0)
                {
                    Response.Data = userList;
                    Response.StatusCode = HttpStatusCode.OK;
                }
                else
                {
                    Response.StatusCode = HttpStatusCode.NotFound;
                    Response.Message = "Null";
                }
            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }

        public async Task<ResponseModel> addUser(User user)
        {
            ResponseModel Response = new ();
            try
            {
                var userExist = await userManager.FindByEmailAsync(user.Email.ToLower().Trim());
                if (userExist != null)
                {
                    Response.StatusCode = HttpStatusCode.BadRequest;
                    Response.Message = "User Allready Exist";
                }
                else
                {
                    UserTbl data = new ()
                    {
                        FirstName = user.FirstName.ToLower().Trim(),
                        LastName = user.LastName.ToLower().Trim(),
                        PhoneNumber = user.Contact.ToLower().Trim(),
                        Email = user.Email.ToLower().Trim(),
                        UserName = user.FirstName + "@" + user.LastName,
                        EmailConfirmed = true,
                        PhoneNumberConfirmed = true,
                    };
                    IdentityResult result = await userManager.CreateAsync(data, user.Password);
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(data, user.Role);
                        Response.Message = "Added Successfully";
                        Response.StatusCode = HttpStatusCode.OK;
                        return Response;
                    }
                    else
                    {
                        List<string> errorResult = new List<string>();
                        foreach (IdentityError error in result.Errors)
                            errorResult.Add(error.Description);
                        Response.Message = JsonSerializer.Serialize(errorResult);
                        Response.StatusCode = HttpStatusCode.BadRequest;
                    }
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = ex.Message;
            }
            return Response;
        }

        public async Task<ResponseModel> updateUser(User user)
        {
            ResponseModel Response = new ();
            try
            {
                var userExist = await userManager.FindByIdAsync(user.Id);
                if (userExist is not null)
                {
                    userExist.FirstName = user.FirstName.ToLower().Trim();
                    userExist.LastName = user.LastName.ToLower().Trim();
                    userExist.Email = user.Email.ToLower().Trim();
                    userExist.PhoneNumber = user.Contact.ToLower().Trim();

                    var oldRoles = await userManager.GetRolesAsync(userExist);
                    if (oldRoles.Count > 0)
                    {
                        foreach (var oldRole in oldRoles)
                        {
                            var roleDelete = await userManager.RemoveFromRoleAsync(userExist, oldRole);
                            var roleAdded = await userManager.AddToRoleAsync(userExist, user.Role);
                        }
                    }
                    else
                    {
                        var roleAdded = await userManager.AddToRoleAsync(userExist, user.Role);
                    }


                    var Result = await userManager.UpdateAsync(userExist);

                    if (Result.Succeeded is true)
                    {
                        Response.Message = "Updated Successfully";
                        Response.StatusCode = HttpStatusCode.OK;
                        return Response;
                    }
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = ex.Message;
            }
            return Response;
        }
        public async Task<ResponseModel> deleteUserById(string id)
        {
            ResponseModel Response = new ();
            try
            {
                var User = await userManager.FindByIdAsync(id);
                if (User is not null)
                {
                    var result = await userManager.DeleteAsync(User);
                    if (result.Succeeded == true)
                    {
                        Response.Message = "Deleted Successfully";
                        Response.StatusCode = HttpStatusCode.OK;
                    }
                    else
                    {
                        List<string> errorResult = new List<string>();
                        foreach (IdentityError error in result.Errors)
                            errorResult.Add(error.Description);
                        Response.Message = JsonSerializer.Serialize(errorResult);
                        Response.StatusCode = HttpStatusCode.BadRequest;
                    }
                }
                else
                {
                    Response.StatusCode = HttpStatusCode.BadRequest;
                }
            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }

    }

}

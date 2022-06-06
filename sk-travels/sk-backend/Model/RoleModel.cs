namespace sk_travel.Model
{
    public class RoleModel
    {
        public string? Id { get; set; }
        public string RoleName { get; set; }
        public List<ModuleList> Module { get; set; }
    }

    public class ModuleList{
        public string Module { get; set; }
    }
}


using DlibDotNet;
using Easyvat.Common.Config;
using Easyvat.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Easyvat.Common.Helper
{
    public static class ImageProccessHelper
    {

        public static async Task<string> CropFaceFromImage(string imagePath, AzureStorageConfig azureStorageConfig)
        {
            try
            {
                byte[] arr = null;
                var AngleRotate = 90;
                var isTotate = false;
                RotateFlipType rotateFlipType = RotateFlipType.Rotate180FlipXY;

                using (WebClient client = new WebClient())
                {
                    arr = client.DownloadData(imagePath);
                };

                // set up Dlib facedetector
                using (var fd = Dlib.GetFrontalFaceDetector())
                {
                    var image = FileHelper.ToImage(arr);

                RotateImage:
                    if (isTotate)
                    {
                        image.RotateFlip(rotateFlipType);
                    }

                    System.Drawing.Rectangle rect = new System.Drawing.Rectangle(0, 0, image.Width, image.Height);

                    System.Drawing.Imaging.BitmapData data = ((Bitmap)image).LockBits(rect, System.Drawing.Imaging.ImageLockMode.ReadWrite, image.PixelFormat);

                    var bp = (Bitmap)image.Clone();

                    var array = new byte[data.Stride * data.Height];

                    Marshal.Copy(data.Scan0, array, 0, array.Length);

                    Array2D<BgrPixel> img = Dlib.LoadImageData<BgrPixel>(array, (uint)image.Height, (uint)image.Width, (uint)data.Stride);

                    // find all faces in the image
                    var faces = fd.Operator(img);

                    if (faces.Length == 0)
                    {
                        switch (AngleRotate)
                        {
                            case 90:
                                rotateFlipType = RotateFlipType.Rotate90FlipNone;
                                break;
                            case 180:
                                rotateFlipType = RotateFlipType.Rotate180FlipNone;
                                break;
                            case 270:
                                rotateFlipType = RotateFlipType.Rotate270FlipNone;
                                break;
                            default:
                                return string.Empty;
                        }

                        AngleRotate += 90;

                        isTotate = true;

                        goto RotateImage;

                    }

                    foreach (var face in faces)
                    {
                        System.Drawing.Rectangle cropRect = new System.Drawing.Rectangle(face.TopLeft.X, face.TopLeft.Y, (int)face.Width, (int)face.Height);

                        Bitmap target = new Bitmap(cropRect.Width, cropRect.Height);

                        using (Graphics g = Graphics.FromImage(target))
                        {
                            g.DrawImage(image, new System.Drawing.Rectangle(0, 0, target.Width, target.Height),
                                             cropRect,
                                             GraphicsUnit.Pixel);
                        }

                        var fileName = string.Format("{0}.png", Guid.NewGuid().ToString());

                        var stream = FileHelper.ToStream(target);

                        var uri = await StorageHelper.UploadFileToStorage(stream, fileName, azureStorageConfig);

                        return uri.AbsoluteUri;
                    }



                }
            }
            catch (Exception)
            {
                //todo:insert logger
            }

            return string.Empty;

        }
        public static string CropFaceFromImage1(string imageBase64)
        {
            using (var fd = Dlib.GetFrontalFaceDetector())
            {

                var src = Base64StringToBitmap(imageBase64);

                //var data = src.LockBits(new System.Drawing.Rectangle(0, 0, src.Width, src.Height),
                //            System.Drawing.Imaging.ImageLockMode.ReadWrite, src.PixelFormat);

                //var arrByte = ImageToByte2(src);

                //src.Dispose();

                //var array = new byte[data.Stride * data.Height];

                //var w = (uint)src.Width;

                //var h = (uint)src.Height;

                //var s = (uint)data.Stride;

                //var img = Dlib.LoadImage<RgbPixel>(inputFilePath);

                //var img = Dlib.LoadImageData<RgbPixel>(arrByte, 4160, 3120, 12480);

                //Bitmap bitmap = (Bitmap)Bitmap.FromFile(inputFilePath);
                System.Drawing.Rectangle rect = new System.Drawing.Rectangle(0, 0, src.Width, src.Height);

                System.Drawing.Imaging.BitmapData data = src.LockBits(rect, System.Drawing.Imaging.ImageLockMode.ReadWrite, src.PixelFormat);

                var bp = (Bitmap)src.Clone();

                var array = new byte[data.Stride * data.Height];

                Marshal.Copy(data.Scan0, array, 0, array.Length);

                Array2D<BgrPixel> img = Dlib.LoadImageData<BgrPixel>(array, (uint)src.Height, (uint)src.Width, (uint)data.Stride);

                // find all faces in the image
                var faces = fd.Operator(img);

                foreach (var face in faces)
                {
                    // draw a rectangle for each face
                    System.Drawing.Rectangle cropRect = new System.Drawing.Rectangle(face.TopLeft.X, face.TopLeft.Y, (int)face.Width, (int)face.Height);

                    Bitmap target = new Bitmap(cropRect.Width, cropRect.Height);

                    using (Graphics g = Graphics.FromImage(target))
                    {
                        g.DrawImage(bp, new System.Drawing.Rectangle(0, 0, target.Width, target.Height),
                                         cropRect,
                                         GraphicsUnit.Pixel);
                    }

                    MemoryStream stream = new MemoryStream();

                    target.Save(stream, System.Drawing.Imaging.ImageFormat.Bmp);

                    byte[] imageBytes = stream.ToArray();

                    // Convert byte[] to Base64 String
                    return Convert.ToBase64String(imageBytes);
                }

                return string.Empty;


            }
        }

        public static byte[] ImageToByte2(Image img)
        {
            using (var stream = new MemoryStream())
            {
                img.Save(stream, System.Drawing.Imaging.ImageFormat.Jpeg);
                return stream.ToArray();
            }
        }

        public static Bitmap Base64StringToBitmap(string base64String)
        {
            Bitmap bmpReturn = null;
            //Convert Base64 string to byte[]
            byte[] byteBuffer = Convert.FromBase64String(base64String);

            MemoryStream memoryStream = new MemoryStream(byteBuffer)
            {
                Position = 0
            };

            bmpReturn = (Bitmap)Image.FromStream(memoryStream);

            memoryStream.Close();
            memoryStream.Dispose();
            byteBuffer = null;

            return bmpReturn;
        }
    }
}





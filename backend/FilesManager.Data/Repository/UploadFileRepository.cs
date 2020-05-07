using FilesManager.Core.IRepository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace FilesManager.Data.Repository
{
    public class UploadFileRepository : IUploadFileRepository
    {
        public void DeleteFile(string url)
        {
            var path = $"wwwroot/{url.Substring(37)}";
            try
            {
                if (File.Exists(path))
                {
                    File.Delete(path);
                }

            }catch(Exception ex)
            {
                ex.Message.ToString();
            }
        }

        string IUploadFileRepository.UploadFile(string base64, string format, string name)
        {
            try
            {
                byte[] imgByte = Convert.FromBase64String(base64);
                var path = $"wwwroot/Files/";
                var server = "http://frnaut-001-site1.atempurl.com/";
                

                if (!Directory.Exists(path))
                {
                        var dir = Directory.CreateDirectory(path);
                }
                
                path = path + $"{name}.{format}";
                using (FileStream fs = File.Create(path))
                {
                    fs.Write(imgByte, 0, imgByte.Length);
                    
                }
                path = $"Files/{name}.{format}";
                return server + path;
            }
            catch(Exception ex)
            {
                var error = ex.Message;
                return null;
            }
        }
    }
}

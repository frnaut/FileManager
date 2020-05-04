﻿using FilesManager.Core.IRepository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace FilesManager.Data.Repository
{
    public class UploadFileRepository : IUploadFileRepository
    {
        string IUploadFileRepository.UploadFile(string base64, string format, string name)
        {
            try
            {
                byte[] imgByte = Convert.FromBase64String(base64);
                var path = $"wwwroot/Files/";
                var server = "https://localhost:44327/";
                

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
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

using System;
using System.Collections.Generic;
using System.Text;

namespace FilesManager.Core.IRepository
{
    public interface IUploadFileRepository
    {
        string UploadFile(string base64, string format, string name);
        void DeleteFile(string url);
    }
}

using FilesManager.Core.IRepository;
using FilesManager.Core.Models;
using FilesManager.Core.Requets;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FilesManager.Core.Managers
{
    public class DocumentManager
    {
        private readonly IDocumentRepository _repository;
        private readonly IUploadFileRepository _upload;
        

        public DocumentManager( IDocumentRepository repository, IUploadFileRepository upload)
        {
            this._repository = repository;
            this._upload = upload;
            
        }

        
        public async Task<List<DocumentModel>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<DocumentModel> GetById(int id)
        {
            return await _repository.GetById(id);
        }


        public async Task<DocumentModel> PostAsync(DocumentRequest document)
        {
            var model = new DocumentModel();

            model.Name = document.Name;
            model.format = document.Format;
            model.path = _upload.UploadFile(document.Document, document.Format, document.Name);
            model.PersonalId = document.PersonalId;

            var newModel = await _repository.PostAsync(model);
            return newModel;
        }


        public void Put(int id, DocumentModel request)
        {
             _repository.Put(request);
        }

        public async Task<DocumentModel> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
        
    }
}

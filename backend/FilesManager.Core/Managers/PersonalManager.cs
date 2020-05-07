using FilesManager.Core.IRepository;
using FilesManager.Core.Models;
using FilesManager.Core.Requets;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FilesManager.Core.Managers
{
    public class PersonalManager
    {
        private readonly IPersonalRepository _repository;
        private readonly IUploadFileRepository _upload;
        private readonly ISearchPersonalRepository<PersonalModel> _search;

        public PersonalManager( IPersonalRepository repository, IUploadFileRepository upload, ISearchPersonalRepository<PersonalModel> search )
        {
            this._repository = repository;
            this._upload = upload;
            this._search = search;
        }

        public async Task<List<PersonalModel>> GetAllAsync()
        {
            return await _repository.GetAllWithDocuments();
        }
        public async Task<PersonalModel> GetByIdAsync(int id)
        {
            return await _repository.GetByIdWithDocuments(id);
        }

        public async Task<PersonalModel> PostAsync( PersonalRequest request)
        {
            var model = new PersonalModel();
            model.Name = request.Name;
            model.LastName = request.LastName;
            model.Identification = request.Identification;
            if(request.ImageName == "")
            {
                model.ProfileImage = "";
            }
            else
            {
                model.ProfileImage = _upload.UploadFile(request.ProfileImage, request.Imageformat, $"{request.ImageName}_{request.Identification}");
            }
            

            if (model.ProfileImage == null  ) { return null; }

            return await _repository.PostAsync(model);
        }
        public async Task Put(int id, PersonalRequest request)
        {
            var model = await this.GetByIdAsync(id);
            model.Id = id;
            model.Name = request.Name;
            model.LastName = request.LastName;
            model.Identification = request.Identification;
            if(request.Imageformat == null || request.ImageName == null || request.ProfileImage == null)
            {
                var img = await _repository.GetById(id);
                model.ProfileImage = img.ProfileImage;
   
            }
            else
            {
                model.ProfileImage = _upload.UploadFile(request.ProfileImage, request.Imageformat, $"{request.Name}_{request.Identification}");
            }

            _repository.Put(model);
        }

        public async Task<PersonalModel> DeleteAsync(int id)
        {

            var model = await _repository.GetById(id);
            await _repository.DeleteAsync(id);
            _upload.DeleteFile(model.ProfileImage);
            return model;
        }

        public async Task<PersonalModel> SearchByIdentification(string indentification)
        {
            return await _search.SearchPersonalIdentification(indentification);
        }
    }
}

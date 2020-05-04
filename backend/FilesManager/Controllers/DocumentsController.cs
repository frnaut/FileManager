using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilesManager.Core.Managers;
using FilesManager.Core.Models;
using FilesManager.Core.Requets;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilesManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DocumentsController : ControllerBase
    {
        private readonly DocumentManager _manager;

        public DocumentsController( DocumentManager manager )
        {
            this._manager = manager;
        }

        [HttpGet]
        public async Task<List<DocumentModel>> GetAll()
        {
            return await _manager.GetAllAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentModel>> GetById(int id)
        {
            var model = await _manager.GetById(id);
            if(model == null) { return NotFound(); }
            return model;
        }

        [HttpPost]
        public async Task<ActionResult<DocumentModel>> Post([FromBody] DocumentRequest request)
        {
            try
            {
                var model = await _manager.PostAsync(request);
                if (model == null) { return BadRequest(); }

                return model;
            }catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<DocumentModel>> Delete(int id)
        {
            try
            {
                var model = await _manager.GetById(id);
                if (model == null)
                {
                    return NotFound();
                }

                await _manager.DeleteAsync(id);
                return model;
            } catch(Exception ex)
            {
                return BadRequest(ex);
            }

        }

        //[HttpPut("{id}")]
        //public async Task<ActionResult> Put(int id, [FromBody] DocumentRequest request)
        //{
        //    var model = await _manager.GetById(id);
        //    if (model == null) { return NotFound(); }
        //    var modelModel = new DocumentModel();
        //    modelModel.Name = request.Name;
        //    modelModel.Personal = request.PersonalI
        //    _manager.Put(id, request);
        //}

    }
}
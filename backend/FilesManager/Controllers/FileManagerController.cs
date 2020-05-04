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
    public class FileManagerController : ControllerBase
    {
        private readonly PersonalManager _manager;

        public FileManagerController(PersonalManager manager)
        {
            this._manager = manager;
        }

        [HttpGet]
        public async Task<List<PersonalModel>> GetAll()
        {
            return await _manager.GetAllAsync();
        }
       
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonalModel>> GetById(int id)
        {
            var model = await _manager.GetByIdAsync(id);
            if(model == null) { return NotFound(); }
                
            return model;
        }

        
        [HttpGet("search/{param}")]
        public async Task<ActionResult<PersonalModel>> SearchByIdentification(string param)
        {
            var model = await _manager.SearchByIdentification(param);
            if (model == null) { return NotFound(); }
            return model;
        }

        [HttpPost]
        public async Task<ActionResult<PersonalModel>> Post([FromBody] PersonalRequest request)
        {
            try
            {
                var model = await _manager.PostAsync(request);
                if (model == null ) { return BadRequest(); }
                return model;
            } catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] PersonalRequest request)
        {
            try
            {
                var model = await _manager.GetByIdAsync(id);
                if (model == null) { return NotFound(); }

                await _manager.Put(id, request);
                return NoContent();
            }catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PersonalModel>> Delete(int id)
        {
            try
            {
                var model = await _manager.GetByIdAsync(id);
                if (model == null) { return NotFound(); }

                return await _manager.DeleteAsync(id);
            }catch (Exception ex)
            {
              return  BadRequest(ex);
            }
        }

    }
}
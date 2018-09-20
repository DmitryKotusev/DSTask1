using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using DSD.Models;
using Newtonsoft.Json;

namespace DSD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        // GET api/data
        [HttpGet]
        public IEnumerable<Roster> Get()
        {
            List<Roster> critters = new List<Roster>();
            // return new string[] { "value1", "value2" };
            using (SqlConnection connection = new SqlConnection("Server=DESKTOP-SKN9RR2;Database=CRITTERS;Trusted_Connection=True;"))
            {
                SqlCommand com = new SqlCommand("Select * from roster", connection);
                connection.Open();

                SqlDataReader reader = com.ExecuteReader();

                while (reader.Read())
                {
                    object jersey, birthday, weight, height;
                    if(reader.IsDBNull(1))
                    {
                        jersey = null;
                    }
                    else
                    {
                        jersey = reader.GetInt32(1);
                    }
                    if (reader.IsDBNull(5))
                    {
                        birthday = null;
                    }
                    else
                    {
                        birthday = reader.GetSqlDateTime(5);
                    }
                    if (reader.IsDBNull(6))
                    {
                        weight = null;
                    }
                    else
                    {
                        weight = reader.GetInt32(6);
                    }
                    if (reader.IsDBNull(7))
                    {
                        height = null;
                    }
                    else
                    {
                        height = reader.GetInt32(7);
                    }
                    critters.Add(
                        new Roster
                        {
                            playerid = reader.GetString(0),
                            jersey = jersey,
                            fname = reader.GetString(2),
                            sname = reader.GetString(3),
                            position = reader.GetString(4),
                            birthday = birthday,
                            weight = weight,
                            height = height,
                            birthcity = reader.GetString(8),
                            birthstate = reader.GetString(9)
                        }
                        );
                }
            }
            return critters.ToArray();
        }

        // POST api/data
        [HttpPost]
        public void Post()
        {
            ToAddItem[] toAdd = JsonConvert.DeserializeObject<ToAddItem[]>(Request.Form["toAdd"]);
            ToEditItem[] toEdit = JsonConvert.DeserializeObject<ToEditItem[]>(Request.Form["toEdit"]);
            ToDeleteItem[] toDelete = JsonConvert.DeserializeObject<ToDeleteItem[]>(Request.Form["toDelete"]);
        }
    }
}

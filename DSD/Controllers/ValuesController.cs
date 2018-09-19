using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace DSD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        class roster
        {
            public string playerid;
            public object jersey;
            public string fname;
            public string sname;
            public string position;
            public object birthday;
            public object weight;
            public object heignt;
            public string birthcity;
            public string birthstate;

            public roster(string playerid, object jersey, string fname, string sname, string position,
                object birthday, object weight, object heignt, string birthcity, string birthstate)
            {
                this.playerid = playerid;
                this.jersey = jersey;
                this.fname = fname;
                this.sname = sname;
                this.position = position;
                this.birthday = birthday;
                this.weight = weight;
                this.heignt = heignt;
                this.birthcity = birthcity;
                this.birthstate = birthstate;
            }
        }
        // GET api/data
        [HttpGet]
        public JsonResult Get()
        {
            List<roster> critters = new List<roster>();
            // return new string[] { "value1", "value2" };
            using (SqlConnection connection = new SqlConnection("Server=localhost\\DESKTOP-SKN9RR2;Database=CRITTERS;Trusted_Connection=True;"))
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
                        new roster(
                            reader.GetString(0),
                            jersey,
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.GetString(4),
                            birthday,
                            weight,
                            height,
                            reader.GetString(8),
                            reader.GetString(9)
                            )
                        );
                }
            }
            return critters.ToArray();
        }

        // GET api/data/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

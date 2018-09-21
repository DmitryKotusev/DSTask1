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
                    if (reader.IsDBNull(1))
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


            using (SqlConnection connection = new SqlConnection("Server=DESKTOP-SKN9RR2;Database=CRITTERS;Trusted_Connection=True;"))
            {
                connection.Open();
                SqlTransaction transaction = connection.BeginTransaction();

                try
                {
                    //Добавление
                    for (int i = 0; i < toAdd.Length; i++)
                    {
                        SqlCommand cmd = connection.CreateCommand();
                        cmd.Transaction = transaction;
                        string commandString = "INSERT INTO roster(playerid, jersey, fname, sname," +
                                "position, birthday, weight, height, birthcity, birthstate) " +
                                "VALUES(@playerid, @jersey, @fname, @sname," +
                                "@position, @birthday, @weight, @height, @birthcity, @birthstate)";
                        cmd.CommandText = commandString;
                        cmd.Parameters.AddWithValue("@playerid", toAdd[i].playerid);
                        cmd.Parameters.AddWithValue("@jersey", toAdd[i].jersey);
                        cmd.Parameters.AddWithValue("@fname", toAdd[i].fname);
                        cmd.Parameters.AddWithValue("@sname", toAdd[i].sname);
                        cmd.Parameters.AddWithValue("@position", toAdd[i].position);
                        cmd.Parameters.AddWithValue("@birthday", toAdd[i].birthday);
                        cmd.Parameters.AddWithValue("@weight", toAdd[i].weight);
                        cmd.Parameters.AddWithValue("@height", toAdd[i].height);
                        cmd.Parameters.AddWithValue("@birthcity", toAdd[i].birthcity);
                        cmd.Parameters.AddWithValue("@birthstate", toAdd[i].birthstate);
                        cmd.ExecuteNonQuery();
                    }

                    // Редактирование
                    for (int i = 0; i < toEdit.Length; i++)
                    {
                        SqlCommand cmd = connection.CreateCommand();
                        cmd.Transaction = transaction;
                        string commandString = "UPDATE roster SET playerid = @playerid, jersey = @jersey, " +
                            "fname = @fname, sname = @sname, position = @position, birthday = @birthday, " +
                            "weight = @weight, height = @height, birthcity = @birthcity, birthstate = @birthstate " +
                            "WHERE playerid = @oldId";
                        cmd.CommandText = commandString;
                        cmd.Parameters.AddWithValue("@playerid", toEdit[i].playerid);
                        cmd.Parameters.AddWithValue("@jersey", toEdit[i].jersey);
                        cmd.Parameters.AddWithValue("@fname", toEdit[i].fname);
                        cmd.Parameters.AddWithValue("@sname", toEdit[i].sname);
                        cmd.Parameters.AddWithValue("@position", toEdit[i].position);
                        cmd.Parameters.AddWithValue("@birthday", toEdit[i].birthday);
                        cmd.Parameters.AddWithValue("@weight", toEdit[i].weight);
                        cmd.Parameters.AddWithValue("@height", toEdit[i].height);
                        cmd.Parameters.AddWithValue("@birthcity", toEdit[i].birthcity);
                        cmd.Parameters.AddWithValue("@birthstate", toEdit[i].birthstate);
                        cmd.Parameters.AddWithValue("@oldId", toEdit[i].oldId);
                        cmd.ExecuteNonQuery();
                    }

                    // Удаление
                    for (int i = 0; i < toDelete.Length; i++)
                    {
                        SqlCommand cmd = connection.CreateCommand();
                        cmd.Transaction = transaction;
                        string commandString = "DELETE FROM roster WHERE playerid = @playerid";
                        cmd.CommandText = commandString;
                        cmd.Parameters.AddWithValue("@playerid", toDelete[i].playerid);
                        cmd.ExecuteNonQuery();
                    }

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    Response.StatusCode = 400;
                }
            }
        }
    }
}

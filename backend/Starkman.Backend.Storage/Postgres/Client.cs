using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class Client
    {
        public Client()
        {
            Clientorder = new HashSet<Clientorder>();
        }

        public long ClientId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Registrationdate { get; set; }

        public ICollection<Clientorder> Clientorder { get; set; }
    }
}

module.exports = {
    async afterCreate(event) {
      const { result } = event;
      try {
        await strapi.plugins["email"].services.email.send({
          to: "info@sjcestep.in",
          from: "info@sjcestep.in",
          subject: "Conatct to step",
          html: `
                  Fist Name :  ${result.firstName}  <br/>
                  Last Name : ${result.lastName}   <br/>
                  Email : ${result.email}   <br/>
                  Phone : ${result.phone}   <br/>
                  Message : ${result.message}   <br/>
    
                `,
        });
      } catch (err) {
        console.log(err.Message);
      }
    },
  };
  
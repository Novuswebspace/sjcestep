module.exports = {
    async afterCreate(event) {
      const { result } = event;
      try {
        await strapi.plugins["email"].services.email.send({
          to: "info@sjcestep.in",
          from: "info@sjcestep.in",
          subject: "Subscribe to step",
          html: `
                  Email : ${result.email}   <br/>
    
                `,
        });
      } catch (err) {
        console.log(err.Message);
      }
    },
  };
  
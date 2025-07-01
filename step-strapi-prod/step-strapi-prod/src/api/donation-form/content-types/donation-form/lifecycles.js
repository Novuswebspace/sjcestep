module.exports = {
  async afterCreate(event) {
    const { result } = event;
    try {
      await strapi.plugins["email"].services.email.send({
        to: "info@sjcestep.in",
        from: "info@sjcestep.in",
        subject: "Donation to step",
        html: `
                Fist Name :  ${result.firstName}  <br/>
                Last Name : ${result.lastName}   <br/>
                Email : ${result.email}   <br/>
                Phone : ${result.phone}   <br/>
  
              `,
      });
    } catch (err) {
      console.log(err.Message);
    }
  },
};

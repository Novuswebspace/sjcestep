module.exports = {
  async afterCreate(event) {
    const { result } = event;
    try {
      // Check if email has already been sent for this specific record
      if (result.emailSent) {
        console.log(
          `Email already sent for record ID ${result.id}, skipping...`
        );
        return;
      }

      await strapi.plugins["email"].services.email.send({
        to: "chandrakanth@sjcestep.in,project@sjcestep.in",
        from: "info@sjcestep.in",
        subject: "New Form Submitted For Founders Fundamental-Other",
        html: `
                  Name :  ${result.Name}  <br/>
                  Phone : ${result.phone}   <br/>
                  Email : ${result.email}   <br/>
                  College : ${result.college}   <br/>
                  Gender : ${result.gender}   <br/>    
                `,
      });

      // Mark this record as emailSent
      await strapi.entityService.update("api::employee-form.employee-form", result.id, {
        data: {
          emailSent: true,
        },
      });

    } catch (err) {
      console.log(err.Message);
    }
  },
};

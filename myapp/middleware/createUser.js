var sql = require("../util/database");
var authentication = require("./authentication");
var Email =  require("../util/Email")


async function create () {


     let orgPassword = Math.random().toString().slice(2,11)

     console.log('orgPassword', orgPassword)

    let password = await authentication.encrypt(orgPassword)

    try {
        var request = new sql.Request();
    
        request.input(`isSuperManager`, 1);
    
        // console.log(orgPassword)
        let Query = `select * from users where isSuperManager = @isSuperManager`
    
        result = request.query( Query,
        
        (error, recordset) => {
          console.log("error", error);
    
          if(recordset?.recordset?.length === 0) {


            let customer = {
              FirstName: 'georgia',
              cusTechRole: 'Manager',
              pass: orgPassword
            }
            Email.sendEmail(customer);
            request.input(`FirstName`, 'georgia');
            request.input(`LastName`, 'xenophontos');
            request.input(`cusTechRole`, 'Manager');
            request.input(`email`, 'xenophontos1georgia@gmail.com');
            request.input(`pass`, password);
            request.input(`Ispromotion`, 0);
            request.input(`isPasswordVerifed`, 0);
            // request.input(`isSuperManager`, 1);
        
            request.query(
              `insert into Users(FirstName, LastName, cusTechRole, email, Pass, Ispromotion, isSuperManager, isPasswordVerifed) values
          
          (@FirstName, @LastName, @cusTechRole, @email, @pass, @Ispromotion, @isSuperManager, @isPasswordVerifed)`,
              (error, recordset) => {

                console.log('error in insert', error)

              })

          }
        }
      );
        
      } catch (ex) {
        console.log('ex', ex)
      }

}

module.exports = {create}
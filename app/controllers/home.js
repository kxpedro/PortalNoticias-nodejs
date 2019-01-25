module.exports.index = function(application, req, res){
    var connection = application.config.SqlConnection();
    var NoticiasDAO = new application.app.models.NoticiasDAO(connection);
    
    NoticiasDAO.get5UltimasNoticias(function(error, result){
        if(error){
            console.log(error);
        }else{
            console.log(result);
            res.render("home/index", {noticias : result});
        }            
    });      
}
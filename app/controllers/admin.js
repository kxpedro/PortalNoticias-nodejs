module.exports.add_noticia = function(application, req, res){
    res.render("admin/add_noticia", {validacao: {}, noticia: {}});
}

module.exports.noticias_salvar = function(application, req, res){
    var noticia = req.body;
        
    function isValidDate(value) {
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
        
        const date = new Date(value);
        if (!date.getTime()) return false;
        return date.toISOString().slice(0, 10) === value;
    } 

    req.assert('titulo','Título é obrigatório').notEmpty();
    req.assert('resumo','Resumo é obrigatório').notEmpty();
    req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
    req.assert('autor','Autor é obrigatório').notEmpty();
    req.assert('noticia','Notícia é obrigatório').notEmpty();           
    req.assert('data_noticia').custom(isValidDate).withMessage('A data é inválida');                   

    var erros = req.validationErrors();
    console.log(erros);

    if(erros){
        res.render("admin/add_noticia", {validacao: erros, noticia: noticia});
        return;
    }

    var connection = application.config.SqlConnection(); 
    var NoticiasDAO = new application.app.models.NoticiasDAO(connection);

    NoticiasDAO.salvarNoticia(noticia, function(error, result){
        if(error){
            console.log(error);
        }else{
            res.redirect('/noticias');
        }            
    });  
}

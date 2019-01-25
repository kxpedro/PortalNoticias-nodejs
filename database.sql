CREATE DATABASE portal_noticias;
USE portal_noticias;
CREATE TABLE noticias(
    id_noticias INT auto_increment,
    titulo VARCHAR(100),
    noticia TEXT,
    data_criacao TIMESTAMP DEFAULT current_timestamp,
    resumo VARCHAR(100),
    autor VARCHAR(30),
    data_noticia DATE,

    primary key(id_noticias)
);
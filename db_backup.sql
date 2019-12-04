-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.8-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para db_fullstack
CREATE DATABASE IF NOT EXISTS `db_fullstack` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_fullstack`;

-- Copiando estrutura para tabela db_fullstack.mensagens
CREATE TABLE IF NOT EXISTS `mensagens` (
  `mensagem_id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `mensagem` varchar(4000) DEFAULT NULL,
  `data_hora` datetime DEFAULT NULL,
  `destinatario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`mensagem_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `destinatario_id` (`destinatario_id`),
  CONSTRAINT `mensagens_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  CONSTRAINT `mensagens_ibfk_2` FOREIGN KEY (`destinatario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela db_fullstack.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_nome` varchar(200) NOT NULL,
  `usuario_email` varchar(200) NOT NULL,
  `usuario_celular` varchar(20) DEFAULT NULL,
  `usuario_senha` varchar(4000) DEFAULT NULL,
  `nv_usuario` int(11) DEFAULT 0,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `UK_USUARIO_EMAIL` (`usuario_email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

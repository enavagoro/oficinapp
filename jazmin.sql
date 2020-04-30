-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: restful_db
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` text,
  `urlImagen` text,
  `urlCard` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Titulito','https://www.petdarling.com/articulos/wp-content/uploads/2016/06/perritos-tiernos.jpg','https://i.pinimg.com/originals/1a/59/25/1a592590ea818b1622b7d9e901b9d44c.jpg'),(5,'[Hirayan] Sneakers Friends','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpm1.narvii.com%2F6321%2F9dbc3f18e90a690a1573a7f52920c8b423263474_hq.jpg&f=1&nofb=1','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Felrostrodelanoticia.files.wordpress.com%2F2011%2F04%2Fhenzemi-total-ahegao-anime-image-gallery-010.jpg&f=1&nofb=1g'),(6,'me Perd0nas','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FUMkV8CJPTMU%2Fmaxresdefault.jpg&f=1&nofb=1','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FQyWr3KU93qU%2Fmaxresdefault.jpg&f=1&nofb=1');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) DEFAULT NULL,
  `rut` varchar(20) DEFAULT NULL,
  `giro` varchar(200) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `ciudad` varchar(200) DEFAULT NULL,
  `contacto` varchar(200) DEFAULT NULL,
  `tipoCompra` int(11) DEFAULT NULL,
  `comuna` varchar(200) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'pepito','undefined','undefined','undefined','undefined','undefined',0,'asdas',0,1,NULL),(2,'1daaaaaaas','sssssss','dasd','asd','dasdas','sdasdasdasd',0,'asdas',0,1,NULL),(5,'Agrícola Amigos','1923192391','360°','derecho ','Talca','123123123',0,'TALCA',1,1,NULL),(8,'Cristopher Orellana ','194739931','Informático ','18 y Medio Norte a','Talca','56932847456',0,'Talca ',0,1,NULL),(9,'Marina Vergara','44856544','Consultora','','','31313',0,'',1,1,NULL),(10,'Cristian Orellana','19473993-9','Informatiqueichon','Talc','Talca','56932847456',0,'Talca',1,1,NULL),(11,'Cristopher Maturana ','194739931','Informático ','18 y Medio Norte a','Talca','56932323232',0,'Talca ',1,1,NULL),(12,'Cristian culiao','194739931','Informático ','18 y Medio Norte a','Talca','56932323232',0,'Talca ',0,1,NULL),(13,'fodhjfkjzldgks','194739931','Informático ','18 y Medio Norte a','Talca','56932323232',0,'Talca ',0,1,NULL),(15,'Cliente de cris','criscliente','alskfj','lakjs','','',0,'',1,NULL,NULL),(16,'alksjf','lkjas','alksfj','lakjs','AS','DASD',0,'',1,2,NULL),(17,'cliente uno','rut','rut','urutua','asf','',0,'asf',0,2,2),(18,'pepito',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(19,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(20,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(21,'1123',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(22,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(23,'alksjf','lkjas','alksfj','lakjs','AS','DASD',0,'asd',1,2,2),(24,'Pedro Pablo','dasd','asda','sda','sdas','asdas',0,'sda',1,2,2),(25,'Pedro Williams','1231231231','hola','calle 212 oriente 12312','talca','1234567',0,'talca',1,2,2),(26,'Paola marin','Rutpaola','Paolapaola','Batuco','Santiago ','Sunumeor',0,'Batuco',1,0,0),(27,'Paola marin','Paola','Paola','Batuco','Batuxo','Num paola',0,'Batuco',1,3,0),(28,'asklfjlkquwori',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(29,'uuuuu',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(30,'asdasd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(31,'Elon ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(32,'w',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(33,'AAAAAAAAAAAAA','AAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAA','AAAAAAAAAAAA',0,'AAAAAAAA',1,10,0),(34,'Elias','192485','laksjf','alkf','akn','slkfn',0,'lkf',1,12,0),(35,'Elias navarrete','19.390.374-6','Venta de videoguegos','Aurora e xile','Talca','e.navagoro@gmail.com',0,'Talca',1,14,0),(36,'angel medina','1.111.111-1','giri','talca','talca','talca',0,'talca',1,14,0),(39,'Tío Baes','BAES BAES','Alimentación Universitaria','Chile','Todas','800 22 7070',0,'Todas',1,13,0),(40,'COMETAZUL S A S','11111111','Actividades de consultoría de gestión','CARRERA 52 A 58 C 40','ANTIOQUIA','3113360412',0,'RIONEGRO',1,13,0),(41,'clientefalso','falso','falso','falso','falso','falso',0,'falso',1,21,0),(42,'Cliente Prueba','123123','asdasd','qsdasda','dsads','dasd',0,'dasd',1,1,0),(43,'Cliente Prueba 3','asd','asdas','dasd','asd','asdasd',0,'as',1,1,0),(44,'Hola Critopers','dasdas','dasd','asda','asd','adasd',0,'sasd',1,1,0),(45,'Agricola muy buenos amigos','123123','asdas','asdas','dasd','asdasdas',0,'das',1,1,0),(46,'asd','1231231','123123','dasd','asda','sdasd',0,'asda',1,1,0),(47,'asdasd','1231','asd','asd','dasd','asda',0,'as',1,1,0),(48,'asd','asd','as','1231','as','dasd',0,'aqsda',1,1,0),(49,'holo','123123','Jiro','asdasd','dasd','asdas',0,'das',1,1,0),(50,'asd','asd','aas','dasd','asd','asdas',0,'asd',1,1,0),(51,'asd','asd1231','qsdas','das','asd','asdasd',0,'sdasdasd',0,13,0),(52,'PruebaX','123123','asdas','asda','das','asda',0,'asd',1,1,0),(53,'HOLA','sdasd','asd','asdas','asdasd','asdasd',0,'das',1,1,0),(54,'CHAOX','12312','asda','asdf','asdf','asdaf',0,'asdasf',1,1,0);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cotizaciones`
--

DROP TABLE IF EXISTS `cotizaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cotizaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCliente` varchar(200) DEFAULT NULL,
  `nombreCliente` varchar(200) DEFAULT NULL,
  `rutCliente` varchar(200) DEFAULT NULL,
  `giroCliente` varchar(200) DEFAULT NULL,
  `direccionCliente` varchar(200) DEFAULT NULL,
  `comunaCliente` varchar(200) DEFAULT NULL,
  `ciudadCliente` varchar(200) DEFAULT NULL,
  `contactoCliente` varchar(200) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  `nombreEmpresa` varchar(200) DEFAULT NULL,
  `rutEmpresa` varchar(200) DEFAULT NULL,
  `giroEmpresa` varchar(200) DEFAULT NULL,
  `direccionEmpresa` varchar(200) DEFAULT NULL,
  `comunaEmpresa` varchar(200) DEFAULT NULL,
  `ciudadEmpresa` varchar(200) DEFAULT NULL,
  `contactoEmpresa` varchar(200) DEFAULT NULL,
  `fechaEmision` date DEFAULT NULL,
  `fechaCaducidad` date DEFAULT NULL,
  `docto` text,
  `estado` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cotizaciones`
--

LOCK TABLES `cotizaciones` WRITE;
/*!40000 ALTER TABLE `cotizaciones` DISABLE KEYS */;
INSERT INTO `cotizaciones` VALUES (4,'10','Cristian Orellana','19473993-9','Informatiqueichon','Talc','Talca','Talca','56932847456',0,1,'Reset','rutreset','girito','dir','comuna','ciudad','contacto','2020-04-30','2020-05-29',NULL,1),(5,'9','Marina Vergara','44856544','Consultora','','','','31313',0,1,'Reset','rutreset','girito','dir','comuna','ciudad','contacto','2020-04-30','2020-04-30','1588210542706.pdf',1),(6,'11','Cristopher Maturana ','194739931','Informático ','18 y Medio Norte a','Talca ','Talca','56932323232',0,1,'Reset','rutreset','girito','dir','comuna','ciudad','contacto','2020-04-30','2020-04-30','1588217167916.pdf',1);
/*!40000 ALTER TABLE `cotizaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_cotizacion`
--

DROP TABLE IF EXISTS `detalle_cotizacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalle_cotizacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cotizacion` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_cotizacion`
--

LOCK TABLES `detalle_cotizacion` WRITE;
/*!40000 ALTER TABLE `detalle_cotizacion` DISABLE KEYS */;
INSERT INTO `detalle_cotizacion` VALUES (1,2,26,'12',12312312,12),(2,3,25,'asdas',123123123,2),(3,4,25,'asdas',123123123,3),(4,5,25,'asdas',123123123,3),(5,6,25,'asdas',123123123,51);
/*!40000 ALTER TABLE `detalle_cotizacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalle_venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_producto` int(11) DEFAULT NULL,
  `titulo` varchar(250) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `id_venta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
INSERT INTO `detalle_venta` VALUES (5,1,'Tarjetas sofia',1000,2,12),(6,2,'Pesas sofia',23500,120,12),(7,1,'Tarjetas sofia',1000,23,13),(8,2,'Pesas sofia',23500,2,14),(9,1,'Tarjetas sofia',1000,5,14),(10,2,'Pesas sofia',23500,25,15),(12,2,'Pesas sofia',23500,25,16),(13,2,'Pesas sofia',23500,12,17),(14,1,'Tarjetas sofia',1000,15,17),(15,1,'Tarjetas sofia',1000,100,18),(16,1,'Tarjetas sofia',1000,100,19),(17,7,'Un año de sofia',1500,12,20),(18,2,'Pesas sofia',23500,3,21),(19,3,'Completo Virtual',0,3,21),(21,11,'asda',0,59999999,33),(22,10,'asdasd',123123,20,34),(23,10,'asdasd',123123,45,35),(24,10,'asdasd',123123,25,36),(25,10,'asdasd',123123,25,37),(26,10,'asdasd',123123,25,38),(27,10,'asdasd',123123,25,39),(28,11,'asda',0,12,40),(29,10,'hola',123123123,30,40),(30,10,'hola',123123123,12,41),(31,10,'hola',123123123,12,42),(32,10,'hola',123123123,12,43),(33,10,'hola',123123123,1,44),(34,10,'hola',123123123,1,45),(35,10,'hola',123123123,2,46),(36,16,'Audífonos bluetooth',7000,1,47),(37,18,'Pulseras',1,25,48),(38,19,'Product 1',1550,12,49),(39,19,'Product 1',1550,100,50),(40,19,'Product 1',1550,2,51),(41,10,'hola',123123123,24,52),(42,20,'Maconha',7000,1,54),(43,21,'Baes',32000,1,55),(44,20,'Maconha',7000,1,56),(45,22,'Completos',1200,2,57),(46,24,'Sitio Web',200000,1,58),(47,26,'12',12312312,25,60);
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) DEFAULT NULL,
  `rut` varchar(20) DEFAULT NULL,
  `giro` varchar(200) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `ciudad` varchar(200) DEFAULT NULL,
  `contacto` varchar(200) DEFAULT NULL,
  `comuna` varchar(200) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `remanente` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES (1,'Reset','rutreset','girito','dir','ciudad','contacto','comuna',1,NULL),(2,'Cris','cris','cris','cris','cris','cris','cris',1,10000),(3,'tucasapro','201275539','venta de articulos geniales','talca','talca','56936109414','talca',1,0),(10,'Granjas El Pollón','11.123.1231-5','Donde crecen los mejores pollos','Granjas el pollón #123123','San Clemente','123123','Corralones',1,NULL),(11,'aaaaaaaaaaaa','1231231231231231232','AAAAAAAAAAAAAAAAAAAAAAAAAA','BBBBBBBBBBBBBBBBB','BBBBBBBBBBBBBBBBBBBBBBBBBBB','BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB','BBBBBBBBBBBBBBBBBBBBBBBB',1,NULL),(12,'COTECH','194837731','Informatica ','18 y media norte A','Talca','56932847456','Talca',1,NULL),(13,'Elías Navarrete','19390374-6','Finanzas Personales','Mi casa','Talca','112233445566','Talca',1,NULL),(14,'Alexis Espinosa','19.650.434-6','Aweonao','asads','talca','talca','talca',1,NULL),(15,'Giorgio','118962435','aseo','Merced 820 of 501','Santiago','Giorgio Roma','Santiago',1,NULL),(16,'giorgio','118962435','aseo','merced 820','santiago','Giorgio Roma','santiago',1,NULL),(17,'Mauricio espinosa','11.998.986-8','Giro','talca','talca','talca','talca',1,NULL),(18,'Ángel','13351757k','tecnología','1','Talca','angelmedina@reset.cl','talca',1,NULL),(19,'insupromed','779615502','salud','seminario 440','santiago','ventas@insupromed.com','providencia',1,NULL),(20,'insupromed','779615502','servicio','seminario 440','santiago','gromach@gmai.com','providencia',1,NULL),(21,'Vase','rutvase','todo','vase','vase','vase','vase',1,NULL),(22,'Yara Fuentes ','201275539','psnose','queti','queti3','queti4','queti2',1,NULL),(23,'Yara Fuentes ','201275539','psnose','queti','queti3','queti4','queti2',1,NULL);
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gastos`
--

DROP TABLE IF EXISTS `gastos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gastos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `monto` int(11) DEFAULT NULL,
  `tipo` int(11) DEFAULT NULL,
  `descripcion` text,
  `fecha` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `tipoDocumento` int(11) DEFAULT NULL,
  `img` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gastos`
--

LOCK TABLES `gastos` WRITE;
/*!40000 ALTER TABLE `gastos` DISABLE KEYS */;
INSERT INTO `gastos` VALUES (1,'En completitos',4500,1,'Descripcion','2020-02-02T21:55:08.925Z',0,2,2,1,NULL),(2,'El gasto es muy real',6700,1,'se necesitaban completos','2020-02-02',0,2,2,1,'null'),(3,'6867',70,2,'Eyrj','2020-02-19T00:00:00-03:00',0,2,2,1,NULL),(4,'Dinocompletos',4500,1,'Por viaje a molina','2020-01-12T00:00:00-03:00',0,2,2,1,NULL),(5,'Pago viatico ',1500,2,'Por viaje a conti','2020-02-19T00:00:00-03:00',0,2,2,1,'null'),(6,'10000',10000,0,'Bah','2020-02-04T20:42:18.202Z',0,2,2,1,NULL),(7,'Tocomples',1500,1,'descripcion','2020-02-04T00:00:00-03:00',0,2,2,1,'null'),(8,'Dff',35,0,'Sfh','2020-02-13T15:45:31.211Z',0,2,2,1,'null'),(9,'235wd234',2342342,0,'4sdfs','2020-02-12T16:05:24.547-03:00',0,2,2,1,'null'),(10,'Hola',12000,1,'Jdjdj','2002-02-19T00:00:00-03:00',0,2,NULL,1,'null'),(11,'Hola',120000,1,'Gasto prueba pl0','2019-02-13',0,2,NULL,1,'null'),(12,'el gasto es muy false',123123,0,'asdasda','2020-02-14',0,2,2,1,'null'),(15,'movilizacion al portal',1500,0,'gasto total','2020-02-18',1,3,0,2,'1582048440724.jpeg'),(16,'Italiano',123123123,0,'un completo italiano','2020-03-05T13:49:52.855-03:00',1,10,0,1,'1583427022716.jpg'),(17,'Con todo',2,0,'asdasdasd','2020-03-04T14:01:25.124-03:00',1,10,0,2,'1583427711287.png'),(18,'Gasto real',1500,0,'desc','2020-03-12T02:26:21.367Z',1,12,0,1,'1583980020893.png'),(19,'Maconha',7000,0,'Compra de macohna al por mayor ahyia','2020-03-11T00:22:42.351-03:00',1,14,0,1,'1584028168096.png'),(20,'Gastos en drogas',1500,0,'Descripcion del gasto','2020-03-11T00:22:42.351-03:00',0,14,0,1,'1584025734502.jpeg'),(21,'Comida Vegetariana',3800,0,'Invitar al Critopers','2020-03-12T00:00:00-03:00',1,13,0,1,'1584032488867.png'),(22,'Compra super previo almuerzo',420,1,'Energética y pizza personal','2020-03-12T19:41:25.708Z',1,2,0,1,'1584042146389.jpg'),(23,'Compeltos',1200,1,'comi completos ','2020-03-12T22:27:01.721Z',1,14,0,1,'Sin imagen'),(24,'Completos',4500,0,'Completos con el Angel y el Mauri','2020-03-13',0,13,0,1,'1584077729072.jpg'),(25,'Completos',4500,0,'Completos con el Angel y el Mauri','2020-03-13',1,13,NULL,1,'Sin imagen'),(26,'Atún, pan y huevos',7558,0,'Comimos atún con mayo casera','2020-03-17T02:03:59.667Z',1,13,0,1,'Sin imagen'),(27,'Atún, tallarines y crema',6454,0,'Comimos al almuerzo','2020-03-17T02:09:25.073Z',0,13,0,1,'Sin imagen'),(28,'Hosting vase premiumhosting',2900,0,'Hosting mes Marzo','2020-03-15T00:00:00-03:00',1,21,0,1,'1584464388105.png'),(29,'NIC 2020',10000,1,'NIC sitio vase.cl 2020','2020-03-06T14:01:16.072-03:00',1,21,0,1,'1584464592166.png'),(30,'Medium ',4408,2,'Correspondiente al mes de abril','2020-03-18',1,21,0,1,'1584569192971.png'),(31,'Almuerzo',6454,0,'Fideos, Crema, Atún','2020-03-16',1,13,0,1,'Sin imagen'),(32,'Chacarero',9200,0,'Invitar al Mauri a comer chacarero','2020-03-17T06:14:08.125-03:00',1,13,0,1,'Sin imagen'),(33,'Pagarle al Jhony',15000,1,'Se le pagó al jhony por los dibujos de la página','2020-03-20T02:35:27.896Z',1,13,0,1,'1584725566053.svg'),(34,'Gasto de Prueba',123123,1,'asdasd','2020-03-28T21:50:52.039Z',0,13,0,2,'Sin imagen'),(35,'Play store',22182,3,'Pago play store ','2020-03-31T17:20:59.432-03:00',1,21,0,1,'Sin imagen'),(36,'Medium',4436,2,'Correspondiente al mes de mayo','2020-04-24T00:00:00-04:00',1,21,0,1,'1587770155355.png');
/*!40000 ALTER TABLE `gastos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `codigo` varchar(50) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Tarjetas sofia',1000,'tjesof',0,NULL,NULL),(2,'Pesas sofia',23500,'9hasgf',1,NULL,NULL),(3,'Completo Virtual',0,'Hola',1,NULL,NULL),(4,'Informaticos',5000,'ifn105',1,NULL,NULL),(5,'aasa',12121,'0',1,NULL,NULL),(6,'sas',121212,'123123',1,NULL,NULL),(7,'Un año de sofia',1500,'123123',1,NULL,NULL),(8,'Completo Virtual',123123,'c1',1,NULL,NULL),(9,'Venta',123123,'c1',NULL,1,1),(10,'hola',123123123,'a1',1,2,2),(11,'asda',0,'s1',1,2,2),(12,'Probando',1400,'s1',NULL,2,2),(13,'asdasdasd',3,'a2',NULL,2,2),(14,'gagag',1123,'a2',NULL,2,2),(15,'Audífonos ',7000,'El1',NULL,0,0),(16,'Audífonos bluetooth',7000,'El1',1,3,0),(17,'depiladora erecargable',7000,'ba',1,3,0),(18,'Pulseras',1,'1231231',1,10,0),(19,'Product 1',1550,'code',1,12,0),(20,'Maconha',7000,'001',1,14,0),(21,'Baes',32000,'T-1',1,13,0),(22,'Completos',1200,'002',1,14,0),(23,'Huevo Jumbo',150,'C0001',1,20,0),(24,'Sitio Web',200000,'S-1',1,13,0),(25,'asdas',123123123,'c1',1,1,0),(26,'12',12312312,'c1',1,1,0),(27,'Majus anualidad',120000,'Servicio',1,21,0);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subCategorias`
--

DROP TABLE IF EXISTS `subCategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subCategorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` text,
  `urlImagen` text,
  `urlCard` text,
  `idCategoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subCategorias`
--

LOCK TABLES `subCategorias` WRITE;
/*!40000 ALTER TABLE `subCategorias` DISABLE KEYS */;
INSERT INTO `subCategorias` VALUES (18,'Ahegao 2','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FJPaqJZ-3c2E%2Fmaxresdefault.jpg&f=1&nofb=1','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fres.cloudinary.com%2Fteepublic%2Fimage%2Fprivate%2Fs--fYQKTs0I--%2Ft_Preview%2Fb_rgb%3A000000%2Cc_limit%2Cf_jpg%2Ch_630%2Cq_90%2Cw_630%2Fv1524231206%2Fproduction%2Fdesigns%2F2610674_1.jpg&f=1&nofb=1',5),(19,'Ahegao 1','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F33.media.tumblr.com%2Fbd4d3a63d216a16729553031ffb121b9%2Ftumblr_ngikhwrkxP1toy0ydo1_1280.gif&f=1&nofb=1','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FWBkOUOzzSHE%2Fmaxresdefault.jpg&f=1&nofb=1',5),(20,'Perrito 1','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.fondox.net%2Fwallpapers%2Fresoluciones%2F14%2Fun-tierno-perro-bebe_1366x768_3462.jpg&f=1&nofb=1','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-D79iiFXrR-w%2FUt1lgUDwUpI%2FAAAAAAAAALo%2FvjGuaGaKNIU%2Fs1600%2Fimagenes-de-perros-lindos-blancos.jpg&f=1&nofb=1',1),(21,'Perrito 2','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-A5JOHtywIRM%2FUW-PjKzc9zI%2FAAAAAAAACeg%2FWc0vvayPVeg%2Fs1600%2FImagenes%2Btiernas-perro-chiguagua%2B(9).jpg&f=1&nofb=1','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FUlMQ8gz7hbA%2Fmaxresdefault.jpg&f=1&nofb=1',1),(22,'Gatito 1','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-6jgVdZEjT78%2FUSe7KWBDh7I%2FAAAAAAAAAWg%2F7464LkmVYzU%2Fs1600%2FCute-Kitten2.jpg&f=1&nofb=1','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2F93%2F94%2F03%2F939403ad9d913c8714c6e6395cc51e00.jpg&f=1&nofb=1',6),(23,'Gatito 2','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fautovid.ecomjunkie.com%2Fwp-content%2Fuploads%2F2018%2F02%2FCute-Kittens-Kids-Fun-Gatos-Chistosos-y-Tiernos.jpg&f=1&nofb=1','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-zqHNgJmGtJE%2FUUjDbXjvM8I%2FAAAAAAAABqg%2FuFyCSadVAXs%2Fs1600%2Ffotos-imagenes-tiernas%252B(7).jpg&f=1&nofb=1',6),(24,'Gatito 3','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fautovid.ecomjunkie.com%2Fwp-content%2Fuploads%2F2018%2F02%2FCute-Kittens-Kids-Fun-Gatos-Chistosos-y-Tiernos.jpg&f=1&nofb=1','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-zqHNgJmGtJE%2FUUjDbXjvM8I%2FAAAAAAAABqg%2FuFyCSadVAXs%2Fs1600%2Ffotos-imagenes-tiernas%252B(7).jpg&f=1&nofb=1',6);
/*!40000 ALTER TABLE `subCategorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoGasto`
--

DROP TABLE IF EXISTS `tipoGasto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipoGasto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) DEFAULT NULL,
  `codigo` varchar(200) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoGasto`
--

LOCK TABLES `tipoGasto` WRITE;
/*!40000 ALTER TABLE `tipoGasto` DISABLE KEYS */;
INSERT INTO `tipoGasto` VALUES (1,'asd','asdasd',1,NULL,1),(2,'Completos','123123123',1,NULL,1),(3,'Viaticos','vit102',1,NULL,1),(4,'Hola','123123123',1,NULL,1),(5,'Jsksjad','Jskdbad',0,2,2),(6,'Aaaaa','Aaaa',0,2,2),(9,'Viaticos','TP-3',1,2,2),(10,'tipo 2','codigo',1,NULL,NULL),(11,'Movilización ','M1',1,0,0),(12,'Movilización ','M1',1,0,3),(13,'Completos','12312312312312',1,0,10),(14,'g1','gasto',1,0,12),(15,'Drogas','001',1,0,14),(16,'Comida','002',1,0,14),(17,'Servicio de internet','003',1,0,14),(18,'Servicio de Luz','004',1,0,14),(19,'Servicio de agua','005',1,0,14),(20,'Alimentación','A-1',1,0,13),(21,'Comida','C1',1,0,2),(22,'Hosting','h1',1,0,21),(23,'Nic DNS','dns',1,0,21),(24,'Estudio y aprendizaje','aprendizaje',1,0,21),(25,'Arte','A-2',1,0,13),(26,'Playstore','playstore',1,0,21);
/*!40000 ALTER TABLE `tipoGasto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoProducto`
--

DROP TABLE IF EXISTS `tipoProducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipoProducto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) DEFAULT NULL,
  `codigo` varchar(200) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoProducto`
--

LOCK TABLES `tipoProducto` WRITE;
/*!40000 ALTER TABLE `tipoProducto` DISABLE KEYS */;
INSERT INTO `tipoProducto` VALUES (1,'Servicio de costo anual','123123',1,1,1),(2,'Hardware','h1',1,1,1),(3,'Capacitacion','c1',0,1,1),(4,'Anual','a2',0,2,2),(5,'Semestral','s1',1,2,2),(8,'Hardware','H-123',0,2,2),(9,'Electrónico ','El1',1,3,3),(10,'Belleza','b1',1,3,0),(11,'belleza','ba',1,3,3),(12,'Servicios de costo anual','1231231',1,4,10),(13,'p1','code',1,6,12),(14,'Maconha','001',0,8,14),(15,'Tarjetas','T-1',1,7,13),(16,'Completos','002',1,8,14),(17,'COMIDA','C0001',1,14,20),(18,'Servicios Web','S-1',1,7,13),(19,'A pedido','Software Ad Hoc',1,15,21),(20,'Servicio Majus','Servicio',1,15,21);
/*!40000 ALTER TABLE `tipoProducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) DEFAULT NULL,
  `apellido` varchar(200) DEFAULT NULL,
  `correo` varchar(200) DEFAULT NULL,
  `clave` varchar(200) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Cristopher','Orellana','corellanajara@hotmail.com','clavesistema',1,1),(2,'admin','admin','admin','admin',1,2),(3,'Cristopher','orellans','cris@tucasapro.cl','tucasa2020',1,3),(4,'Adrián','Olivares','pedrodiego@hotmail.com','123123',1,10),(5,'Juan','Pedro','juapedro@hotmail.com','123',1,NULL),(6,'Cristopher ','Orellana','chris_ecko@hotmail.es','clavesistema',1,12),(7,'Elías','Navarrete','e.navagoro@gmail.com','123123',1,13),(8,'mauricio','espinosa','alexisespinosa@reset.cl','M4UR1C1O',1,14),(9,'Giorgio','Roma','groma@comprafacil.cl','cuentafacil1',1,15),(10,'giorgio','roma','groma@cuentafacil.cl','cuenta 1',1,16),(11,'Mauricio','Espinosa','mauricioespinosa@reset.cl','pasopaso',1,17),(12,'Ángel','Medina','angelmedina@reset.cl','ang3l1ll0',1,18),(13,'giorgio','roma','giorgioroma@insupromed.com','insupromed440',1,19),(14,'giorgio','roma','gromach@gmail.com','Anto2007',1,20),(15,'Cristopher','Orellana','cristopherorellana@vase.cl','clavesistema',1,21),(16,'Elias','Navarrete','eliasnavarrete@vase.cl','claveelias',1,21),(17,'Alexis','Espinosa','alexisespinosa@vase.cl','clavealexis',1,21),(18,'Elaya','crack','elayas-crack@gmail.com','123123',0,13),(19,'usuario falsito','falsote','usuariofalso@gmail.com','clavedelloco',0,21),(20,'yara','fuentes','yarafuentes.158@gmail.com','2101',1,22),(21,'','','','',1,23);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) DEFAULT NULL,
  `fecha` varchar(200) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (22,16,'2020-01-12T02:03:13.384Z',0,2,2),(23,16,'2020-02-12T02:17:45.599Z',0,2,2),(31,16,'2020-02-12T00:00:00-03:00',0,2,2),(32,16,'2020-02-12T04:25:38.054Z',0,2,2),(33,16,'2020-02-12T04:25:47.517Z',0,2,2),(35,17,'2020-02-13T18:36:56.743Z',1,0,0),(36,17,'2020-02-13T18:39:42.766Z',0,2,2),(37,17,'2020-02-13T18:39:54.363Z',0,2,2),(38,17,'2020-02-13T18:40:00.650Z',0,2,2),(39,17,'2020-02-13T18:40:02.587Z',0,2,2),(40,25,'2020-02-15',0,0,2),(41,24,'2020-02-15',1,0,0),(42,24,'2020-02-15T21:30:16.252Z',1,0,0),(43,24,'2020-02-15T21:31:34.950Z',1,0,NULL),(44,24,'2020-02-15T21:32:14.897Z',0,0,2),(45,25,'2019-04-17',0,0,2),(46,23,'2020-01-13T19:29:56.937-03:00',0,0,2),(47,27,'2020-02-18',1,0,3),(48,33,'2020-03-05',1,0,10),(49,34,'2020-03-12T01:51:01.440Z',1,0,12),(50,34,'2020-03-12',1,0,12),(51,34,'2020-03-12',1,0,12),(52,16,'2020-03-12T03:09:35.893Z',0,0,2),(53,35,'2020-03-12T03:25:12.294Z',0,0,14),(54,35,'2020-03-12T03:41:20.041Z',1,0,14),(55,39,'2020-03-09T13:48:44.819-03:00',1,0,13),(56,36,'2020-03-12T22:27:54.014Z',0,0,14),(57,36,'2020-03-12T22:30:23.405Z',1,0,14),(58,40,'2020-03-19T09:21:22.301Z',1,0,13),(59,40,'2020-03-09T13:48:44.819-03:00',0,NULL,13),(60,5,'2020-03-30T00:54:28.515Z',1,0,1);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-30  4:30:57

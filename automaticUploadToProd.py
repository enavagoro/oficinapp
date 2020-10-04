from ftplib import FTP, error_perm
import os
from time import sleep
import sys

user = "actualizador@jazmin.vase.cl"
password = "clavesistema"
host = "ftp.vase.cl"
port = 21

ftp = FTP()
ftp.connect(host,port)
ftp.login(user,password)
filenameCV = "directorypath"

cwd = os.getcwd()
path = cwd+"/www"
def uploadFiles(ftp,path):
	for file in os.listdir(path):		
		filepath = os.path.join(path, file)
		if os.path.isfile(filepath):
			print("Ahora le toca a : "+file)
			realfile = open(filepath,'rb')
			ftp.storbinary("STOR "+file, realfile)
		elif os.path.isdir(filepath):
			print("Ahora le toca a la carpeta : ", filepath)
			try:
				ftp.mkd(file)            
			except error_perm as e:
				if not e.args[0].startswith('550'): 
					raise			                        
			ftp.cwd(file)
            		uploadFiles(ftp, filepath)           
            		print("CWD", "..")
            		ftp.cwd("..")
			
uploadFiles(ftp,path)
print("listo! :D")

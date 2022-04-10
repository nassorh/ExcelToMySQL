import mysql.connector
from ErrorHandling import *

class Database():
  def __init__ (self,host,user,password,database):
    self.host = host
    self.user = user
    self.password = password
    self.database = database 
  
  def __enter__(self) -> object:
    # print("Connecting...")
    try:
      self.mydb = mysql.connector.connect(
        host=self.host,
        user=self.user,
        password=self.password,
        database=self.database
      )
      self.conn = self.mydb.cursor()
    except mysql.connector.errors.InterfaceError:
      raise HostError(self.host)
    except mysql.connector.ProgrammingError as e:
      if "database" in str(e):
        raise DatabaseError(self.database)
      else:
        raise Invaildlogin(self.host,self.password)
    # print("Connected")
    return self.conn
  
  def __exit__(self, exception_type, exception_value, traceback):
    self.mydb.close()

  @classmethod
  def convert_excel_to_db(cls,host,user,password,database):
    with cls(host,user,password,database) as db:
            # print(db)
            pass
    return 1

Database.convert_excel_to_db("localhost","test","test","test")
import sqlalchemy
from ErrorHandling import *
from File import *

class Database():
  def __init__ (self,host,user,password,database):
    self.host = host
    self.user = user
    self.password = password
    self.database = database 
  
  def __enter__(self) -> object:
    print("Connecting...")
    try:
      self.engine = sqlalchemy.create_engine('mysql://{}:{}@{}/{}'.format(self.user,self.password,self.host,self.database))
      self.conn = self.engine.connect()
    except sqlalchemy.exc.OperationalError as e:
      if "2005" in str(e):
        raise HostError(self.host)
      elif "2002" in str(e):
        raise InvaildPort(self.host)
      elif "1045" in str(e):
        raise Invaildlogin(self.user,self.password)
      elif "1049" in str(e):
        raise DatabaseError(self.database)
      else:
        print(e)
        raise ValueError()
    
    print("Connected")
    return self.conn
  
  def __exit__(self, exception_type, exception_value, traceback):
    self.conn.close()

  @classmethod
  def convert_excel_to_db(cls,db,file):
    with db as conn:
      rows_affected = file.dataFrame.to_sql(db.database, conn,if_exists='replace')
    return rows_affected


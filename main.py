from Database import *
from File import *

def get_file():
  while True:
    try:
      file_dir = input("Enter file directory: ")
      file = File(file_dir)
    except FileNotFoundError as e:
      print(e)
      continue
    else:
      return file

def get_host_user_pass_database():
    host = input("Enter the database url: ")
    user = input("Enter the database username: ")
    password = input("Enter the database password: ")
    database = input("Enter the database name: ")
    
    return host,user,password,database

def main():
  while True:

      try:
        host,user,password,database = get_host_user_pass_database()
        db = Database(host,user,password,database)
        file = get_file()
        table_name = input("Enter name of table you wish to create: ")
        rows_affected = Database.convert_excel_to_db(table_name,file)
        print("Rows changed {}".format(rows_affected))

      except ValueError as e:
        print(e)
        continue

      else:
        break
main()
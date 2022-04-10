from Database import *

def get_host_user_pass_database():
    host = input("Enter the database url: ")
    user = input("Enter the database username: ")
    password = input("Enter the database password: ")
    database = input("Enter the database password: ")
    
    return host,user,password,database

def main():
  while True:

      try:
        host,user,password,database = get_host_user_pass_database()
        Database.convert_excel_to_db(host,user,password,database)

      except ValueError as e:
        print(e)
        continue

      else:
        break
main()
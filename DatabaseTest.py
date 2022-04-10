import unittest
from Database import *
from File import *
class TestDatabase(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.host = "127.0.0.1:3306"
        cls.user = "test"
        cls.password = "test"
        cls.database = "test"
        cls.file = File("by-ethnicity-table.csv")

    def test_valid_test(self):
        print("Vaild Test")
        db = Database(self.host,self.user,self.password,self.database)
        Database.convert_excel_to_db(db,self.file)

    def test_invaild_host(self) -> None:
        invaild_host = "invaild_host"
        print("Invaild Host Test: {}".format(invaild_host))
        
        db = Database(invaild_host,self.user,self.password,self.database)
        self.assertRaises(HostError,Database.convert_excel_to_db,db,self.file)
    
    def test_invaild_port(self) -> None:
        invaild_host = "127.0.0.1:33361"
        print("Invaild Host Test: {}".format(invaild_host))
        
        db = Database(invaild_host,self.user,self.password,self.database)
        self.assertRaises(InvaildPort,Database.convert_excel_to_db,db,self.file)

    def test_invaild_user(self) -> None:
        invaild_user = "invaild_user"
        print("Invaild User Test: {}".format(invaild_user))

        db = Database(self.host,invaild_user,self.password,self.database)
        self.assertRaises(Invaildlogin,Database.convert_excel_to_db,db,self.file)

    def test_invaild_pass(self) -> None:
        invaild_password = "invaild_pass"
        print("Invaild Password Test: {}".format(invaild_password))

        db = Database(self.host,self.user,invaild_password,self.database)
        self.assertRaises(Invaildlogin,Database.convert_excel_to_db,db,self.file)

    def test_invaild_database(self) -> None:
        invaild_database = "invaild_database"
        print("Invaild Database Test: {}".format(invaild_database))

        db = Database(self.host,self.user,self.password,invaild_database)
        self.assertRaises(DatabaseError,Database.convert_excel_to_db,db,self.file)

if __name__ == "__main__":
    unittest.main()
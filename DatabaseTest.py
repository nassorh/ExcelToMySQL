import unittest
from Database import *

class TestDatabase(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.host = "localhost"
        cls.user = "test"
        cls.password = "test"
        cls.database = "test"

    def test_valid_test(self):
        print("Vaild Test")
        self.assertEqual(Database.convert_excel_to_db("localhost",self.user,self.password,self.database),1)

    def test_invaild_host(self) -> None:
        invaild_host = "invaild_host"
        print("Invaild Host Test: {}".format(invaild_host))
        
        self.assertRaises(HostError,Database.convert_excel_to_db,invaild_host,self.user,self.password,self.database)

    def test_invaild_user(self) -> None:
        invaild_user = "invaild_user"
        print("Invaild User Test: {}".format(invaild_user))

        self.assertRaises(Invaildlogin,Database.convert_excel_to_db,self.host,invaild_user,self.password,self.database)

    def test_invaild_pass(self) -> None:
        invaild_password = "invaild_pass"
        print("Invaild Password Test: {}".format(invaild_password))

        self.assertRaises(Invaildlogin,Database.convert_excel_to_db,self.host,self.user,invaild_password,self.database)

    def test_invaild_database(self) -> None:
        invaild_database = "invaild_database"
        print("Invaild Database Test: {}".format(invaild_database))

        self.assertRaises(DatabaseError,Database.convert_excel_to_db,self.host,self.user,self.password,invaild_database)

if __name__ == "__main__":
    unittest.main()
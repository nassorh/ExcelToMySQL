import unittest
from File import *
class TestDatabase(unittest.TestCase):
    def test_valid_directory(self):
       self.assertRaises(FileNotFoundError,File,"invaild Dir")

    def test_invalid_directory(self):
        file = File("by-ethnicity-table.csv")
        self.assertEqual(file.test(),1)


if __name__ == "__main__":
    unittest.main()
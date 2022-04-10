import pandas as pd

class File():
    def __init__(self,file):
        self.dataFrame = pd.read_csv(file)
    
    def test(self):
        return 1

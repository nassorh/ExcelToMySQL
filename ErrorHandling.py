class HostError(ValueError):
    def __init__(self, host, message="Invaild host check the IP address\nWhen connecting to localhost type 'localhost'"):            
        # Call the base class constructor with the parameters it needs
        super().__init__(message)
        self.host = host

class DatabaseError(ValueError):
    def __init__(self, db, message="Invaild database"):            
        # Call the base class constructor with the parameters it needs
        super().__init__(message)  
        self.db = db

class Invaildlogin(ValueError):
    def __init__(self, host,password,message="Invaild login credentials\n"):            
        # Call the base class constructor with the parameters it needs
        super().__init__(message)
        self.host = host
        self.password = password
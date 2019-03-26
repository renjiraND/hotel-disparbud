from peewee import PostgresqlDatabase, Model

postgre_uri = "postgres://tucyrjjncfctau:898f3d18b808f9b0c83d3c82937cbac010d9633f3b7994e2fd440c5b89a5fe67@ec2-54-221-243-211.compute-1.amazonaws.com:5432/dvqfg97umbtg7"

db = PostgresqlDatabase('dvqfg97umbtg7', dsn=postgre_uri)

class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db
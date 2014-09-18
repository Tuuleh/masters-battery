import complete_battery.templates

class RootController(TGController):
    @expose()
    def index(self):
        return 'Hello World'

    @expose('complete_battery.templates.hello.jinja')
    def hello(self, person=None):
        return dict(person=person)

    @expose('demographics.html')
    def demographics(self):
    	return dict()
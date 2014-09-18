from tg import expose, TGController, AppConfig
import complete_battery
import logging

log = logging.getLogger(__name__)

class RootController(TGController):

    @expose()
    def logger(self):
        log.debug("My first logged controller!")
        return "OK"

    @expose()
    def helloworld(self):
        return 'Hello World'

    @expose('hello.jinja')
    def hello(self, person=None):
        return dict(person=person)

    #loads but screams about missing dependancies
    @expose('mental_rotation.html')
    def mental_rotation(self):
        return dict()

    @expose('complete_battery.templates.index')
    def index(self):
        return dict()

    @expose('complete_battery.templates.demographics')
    def demographics(self):
        return dict()

    @expose('complete_battery.templates.survey_with_intro.html')
    def survey_with_intro(self):
    	return dict()

    @expose('/../templates/flanker.html')
    def flanker(self):
    	return dict()


config = AppConfig(minimal=True, root_controller=RootController())
config.renderers = ['jinja']
config.serve_static = True
config.paths['static_files'] = 'public'

application = config.make_wsgi_app()
from wsgiref.simple_server import make_server

print "Serving on port 8080..."
httpd = make_server('', 8080, application)
httpd.serve_forever()
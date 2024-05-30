all: straight-to-web.xpi

straight-to-web.xpi: *.js manifest.json
	zip -r -FS ./straight-to-web.xpi * --exclude '*.git*' --exclude '*~' --exclude '.*' --exclude 'Makefile' --exclude '*.md'

.PHONY: lint

lint:
	web-ext lint

.PHONY: clean
clean:
	rm straight-to-web.xpi

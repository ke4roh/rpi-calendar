CALENDAR_VER=`cat release_number.txt`
MAKESELF_VER=2.4.2

makeself-$(MAKESELF_VER)/makeself.sh: 
	wget --quiet https://github.com/megastep/makeself/releases/download/release-$(MAKESELF_VER)/makeself-$(MAKESELF_VER).run
	sh ./makeself-$(MAKESELF_VER).run
	rm makeself-$(MAKESELF_VER).run

calendar-install-$(CALENDAR_VER).run: makeself-$(MAKESELF_VER)/makeself.sh install.sh hosts-localhost playbook.yml $(wildcard roles/**/*)
	mkdir -p package
	cp -r hosts-localhost install.sh roles playbook.yml package/.
	# makeself.sh [args] archive_dir file_name label startup_script [script_args]
	makeself-$(MAKESELF_VER)/makeself.sh package calendar-install-$(CALENDAR_VER).run "Installing setup scripts" install.sh


.PHONY: clean package release

clean:
	rm -rf package calendar-install-*.run

package: calendar-install-$(CALENDAR_VER).run

release: package
	git tag r$(CALENDAR_VER)
	git push origin
	curl -X POST -H "Accept: application/vnd.github.v3+json" \
		https://api.github.com/repos/jscarbor/rpi-calendar/releases \
		-d '{"tag_name":"'r$(CALENDAR_VER)'"}'
	expr $(CALENDAR_VER) + 1 >release_number.txt

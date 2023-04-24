dim clash
set clash = Wscript.CreateObject("Wscript.Shell")
clash.run "taskkill /f /im clash.exe",0
Wscript.quit
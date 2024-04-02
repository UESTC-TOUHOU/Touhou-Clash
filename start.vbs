dim clash
set clash = Wscript.CreateObject("Wscript.Shell")
clash.run "clash -d ./config",vhide
'Wscript.quit
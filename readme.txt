#utils for rimacy projects

#new user configuration mysql and spring 
	problem: "java.sql.SQLException: Unable to load authentication plugin 'caching_sha2_password'"!!!
	solution: The newer versions of MySQL default to caching_sha2_password and not the old mysql_native_password that the plugins seem to want to use.

I think you can convert the users but it was easy enough for me to just delete them and then recreate them with the mysql_native_password as the default authentication.

CREATE USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pa$$word';

No more server console spam WARN messages from Skywars all the time.
  

#dump data base 

mysql -u username -p database_name < file.sql


#Create desktop shortcut launcher manually
Now that we have all the necessary information, create a new file Skype.desktop within ~/Desktop directory and paste the following lines as part of the file's content. Change the code where necessary to fit your application specific details.

$ gedit ~/Desktop/Skype.desktop

#!/usr/bin/env xdg-open
[Desktop Entry]
Version=1.0
Type=Application
Terminal=false
Exec=/snap/bin/skype
Name=Skype
Comment=Skype
Icon=/snap/skype/23/usr/share/icons/hicolor/256x256/apps/skypeforlinux.png

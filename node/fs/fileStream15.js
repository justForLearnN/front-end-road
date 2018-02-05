/**
 * 自动创建文件结构
 */

var fs = require('fs');

var projectData = {

	'name': 'tigerbrokers',
	'fileData': [
		{
			'name': 'css',
			'type': 'dir'
		},
		{
			'name': 'js',
			'type': 'dir'
		},
		{
			'name': 'images',
			'type': 'dir'
		},
		{
			'name': 'index.html',
			'type': 'file',
			'content': 'this is a html file.'
		}
	]

};

if (projectData.name) {
	
	fs.mkdir(projectData.name);

	var fileData = projectData.fileData;

	if (fileData && fileData.forEach) {

		fileData.forEach(function(f) {

			f.path = projectData.name + '/' + f.name;
			f.content = f.content || '';

			switch(f.type) {
				case 'file':
					fs.writeFileSync(f.path, f.content);
					break;
				case 'dir':
					fs.mkdirSync(f.path);
					break;
				default:
					break;
			}
		});
	}
};
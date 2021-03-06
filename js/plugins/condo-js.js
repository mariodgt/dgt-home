(function(){
	var revenueChart = new FusionCharts({
	  type: 'doughnut2d',
	  renderAt: 'chart-container',
	  width: '380',
	  height: '250',
	  dataFormat: 'json',
	  dataSource: {
	      "chart": {
	          "paletteColors": "#cfd0d0,#575858,#0072ac",
	          "bgColor": "#ffffff",
	          "showBorder": "0",
	          "use3DLighting": "0",
	          "showShadow": "0",
	          "enableSmartLabels": "0",
	          "startingAngle": "310",
	          "showLabels": "0",
	          "showPercentValues": "0",
	          "showLegend": 0,
	          "legendShadow": "0",
	          "legendBorderAlpha": "0",
	          "defaultCenterLabel": "570 Units",
	          "centerLabelBold": "2",
	          "showTooltip": 0,
	          "labelDisplay": "none",
	          "decimals": "0",
	          "captionFontSize": "18",
	          "subcaptionFontSize": "14",
	          "subcaptionFontBold": "0"
	      },
	      "data": [
	          {
	              "value": "28504"
	          }, 
	          {
	              "value": "4910"
	          }, 
	          {
	              "value": "4910"
	          }
	      ]
	  }
	}).render();

	var hoverdef=$("#wpfloorplan .img-floorplan").attr("src");
	var el="#wpfloorplan";
	$('.wp-table-condo').find('.eventhover').mouseenter(function(){
		var b=$(this).data("img");
		if(b != ""){
			$(this).parents('.wp-floorplan-condo').find('.img-floorplan').find('img').attr("src", $(this).data('img'));
		}
	}).mouseleave(function(){
	var $wpTower = $(this).parents('.wp-floorplan-condo');
		$wpTower.find('.img-floorplan').find('img').attr("src", $wpTower.find('.wp-imagen img').attr('src'));
	});

	$('#dataTable-a').DataTable();
	$('#dataTable-b').DataTable();
}());
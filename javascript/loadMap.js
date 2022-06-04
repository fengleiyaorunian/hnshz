
require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", 'esri/geometry/Point'],
    function (esriConfig, Map, MapView, FeatureLayer, Point) {
        esriConfig.apiKey = "YOUR_API_KEY";
        const map = new Map({
            basemap: "osm" // Basemap layer service
        });

        const view = new MapView({
            map: map,
            center: [120.805, 30.027], // Longitude, latitude
            zoom: 5, // Zoom level
            container: "viewDiv" // Div element
        });
        // view.goTo([114.30, 30.60])
        //添加切换图层的事件
        document.getElementById('bm').addEventListener('change', function () {
            map.basemap = $('#bm').val()
        })
        // console.log(layerUrl.length)
        //创建一个数组用于保存所有图层
        var layers = [];
        //创建图层,并加载
        for (let i = 0; i < layerUrl.length; i++) {
            // alert(layerUrl[i]);
            let layer = new FeatureLayer({
                url: layerUrl[i]
            })
            layers.push(layer);
            map.add(layer)
        }

        //添加图层
        $('.lm').change(function () {
            if (this.checked === true) {
                map.add(layers[this.value])
                alert(this.value)
            } else {
                map.remove(layers[this.value])
            }
        })
        //移除图层
        $('.del').click(function () {
            // alert(this.value)
            let index = this.getAttribute("value")

            map.remove(layers[index]);
            //将其从列表中删除
            layerName.splice(index, 1);
            layerUrl.splice(index, 1);
            layers.splice(index, 1);
            //重新生成复选框
            lmMethods();
            // console.log(layerName)
            //重新绑定事件
            $('.lm').change(function () {
                if (this.checked === true) {
                    map.add(layers[this.value])
                    alert(this.value)
                } else {
                    map.remove(layers[this.value])
                }
            })
            //绑定删除事件
            del();
        })

        function del() {
            $('.del').click(function () {
                let index = this.getAttribute("value")

                map.remove(layers[index]);
                layerName.splice(index, 1);
                layerUrl.splice(index, 1);
                layers.splice(index, 1);
                lmMethods();
                $('.lm').change(function () {
                    if (this.checked === true) {
                        map.add(layers[this.value])
                        alert(this.value)
                    } else {
                        map.remove(layers[this.value])
                    }
                })
            })
            //重新绑定事件
            $('.lm').change(function () {
                if (this.checked === true) {
                    map.add(layers[this.value])
                    alert(this.value)
                } else {
                    map.remove(layers[this.value])
                }
            })

        }

        // 比例尺、坐标
        view.on('pointer-move', function (e) {
            //将屏幕坐标转化为经纬度
            let point = view.toMap({ x: e.x, y: e.y });
            //保留三位小数
            //显示经纬度
            $('#pos').html(point.latitude + '<br/>'+point.longitude);
        });

        view.on("click", function (e) {
            console.log(e);
            // if (e.button === 2) {
            //     view.goTo([114.30, 30.60], {duration: 1000}).then(function () {
            //         alert("welcome")
            //     })
            // }
            console.log(e.mapPoint.latitude);
            console.log(e.mapPoint.longitude);

        })
        //修改比例尺
        view.on("mouse-wheel", function () {
            let pscale = view.scale
            $('#scaleNum').text(pscale)
            // console.log(pscale)
        });
    });

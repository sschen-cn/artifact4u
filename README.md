# artifact4u
一款开源的artifact app

## 数据爬取
    官网于11月9日公布了所有卡组的api
    https://github.com/ValveSoftware/ArtifactDeckCode
    [site=00]基本集合：https://playartifact.com/cardset/00/
    [site=01]战争召唤：https://playartifact.com/cardset/01/
    将回复中的"cdn_root"+"url"就能获取到所有json格式的卡牌数据
    首先读取site=01中的卡牌，存为api中卡牌的英文数据
    中文数据本来准备用有道的fanyi这个模块，后来发现机翻忒蠢了

## 图片上传cdn
    图片上传七牛cdn
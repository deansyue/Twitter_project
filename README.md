# Simple Twitter - Alphitter Website

## ❖ 專案介紹：

本專案為前、後端分離之團隊開發專案，模擬簡易社群網站之開發。
使用者可進行註冊、登入、登出、發文、回覆、追蹤、按讚、修改個人資料...等功能。
並設有管理者帳號，區別使用者與管理者之權限。

## ❖ 專案功能：

#### 一般使用者：

- 註冊 - 未擁有帳號之使用者，可註冊帳號 ( 帳號、信箱不可重複 )
- 登入- 使用者可以帳號及密碼登入系統（使用者身分驗證隨登入登出改動 )
- 瀏覽推文與回覆 - 使用者可檢視所有推文與回覆
- 發送推文與回覆 - 使用者可新增推文與回覆指定推文，頁面即時更新
- 修改資料 - 使用者可修改帳號資料、照片、背景及自我介紹
- 使用者可追蹤、取消追蹤他人 – 追蹤狀態頁面按鈕顯示追蹤與被追蹤之狀態
- 使用者可喜歡、取消喜歡推文 – 個人頁面顯示使用者按讚推文

#### 後台管理員：

- 後台管理員由後端直接寫入資料庫、不可註冊
- 管理員可由後台入口登入、無法進入前台網頁
- 管理員可瀏覽所有貼文、刪除指定推文
- 管理員可瀏覽使用者之各式數據 ( 僅可瀏覽 )

## ❖ 環境建置：

- Vue.js
- Vuex
- Vue router
- Axios
- SASS

## ❖ 專案安裝流程

1. 打開您的終端機(terminal)，複製(clone)專案至本機

```bash
git clone https://github.com/Joy-Chang-2021/Twitter_project.git
```
2. 進入存放此專案之資料夾

```bash
cd Twitter_project
```
3. 安裝 npm 套件

```bash
npm install
```
4. 啟動專案

```bash
npm run serve
```
5. 根據終端機(terminal)指示，使用網址 http://localhost:8080 查看網站


## ❖ 種子資料使用者

可使用種子資料新增的使用者操作本專案

### 後台帳號
```bash
admin
   account：root
   password：12345678
```
### 前台帳號

```bash
user1
   account：user1
   password：12345678

user2
   account：user2
   password：12345678

user3
   account：user3
   password：12345678

user4
   account：user4
   password：12345678

user5
   account：user5
   password：12345678

```

## ❖ 相關連結

### 前端

- github：https://github.com/Joy-Chang-2021/Twitter_project.git
- Github Page：https://Joy-Chang-2021.github.io/Twitter_project/

### 後端

- github：https://github.com/hmrvc/twitter-api-2020
- Heroku：https://thawing-citadel-19528.herokuapp.com/

## ❖ Team / 團隊成員

- [Joy-Chang](https://github.com/Joy-Chang-2021)
- [MuChuan-Hung](https://github.com/muchuanhung)
- [Lun](https://github.com/zheRoom)
- [Lena](https://lighthouse.alphacamp.co/users/6721)
- [薛詠駿](https://lighthouse.alphacamp.co/users/6509)

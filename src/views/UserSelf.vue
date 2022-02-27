<template>
  <div class="app-tripple-column">
    <div class="left-container"><NavBar /></div>
    <div class="middle-container">
      <UserCard
        :tweets="tweets"
        :currentUserData="currentUserData"
        :whichPage="whichPage"
      />
      <div class="switchTabs">
        <div
          class="tweetTab"
          :class="[{ activeTabs: tabNow === 1 }]"
          @click="tabNow = 1"
        >
          推文
        </div>
        <div
          class="replyTab"
          :class="[{ activeTabs: tabNow === 2 }]"
          @click="tabNow = 2"
        >
          推文與回覆
        </div>
        <div
          class="likeTab"
          :class="[{ activeTabs: tabNow === 3 }]"
          @click="tabNow = 3"
        >
          喜歡的內容
        </div>
      </div>
      <div class="self-tweet-wrapper" v-if="tabNow === 1">
        <div class="self-tweet" v-for="tweet in tweets" :key="tweet.id">
          <TweetCard :tweet-card="tweet" />
        </div>
      </div>
      <div class="self-reply-wrapper" v-else-if="tabNow === 2">
        <div class="self-reply" v-for="reply in replys" :key="reply.id">
          <ReplyCard :replyCard="reply" />
        </div>
      </div>
      <div class="self-like-wrapper" v-else>
        <div class="self-like" v-for="tweet in tweets" :key="tweet.id">
          <TweetCard :tweet-card="tweet" />
        </div>
      </div>
    </div>
    <div class="right-container"><Popular /></div>
  </div>
</template>
<script>
import NavBar from "./../components/NavBar";
import Popular from "./../components/Popular";
import UserCard from "./../components/UserCard";
import TweetCard from "../components/TweetCard.vue";
import ReplyCard from "../components/ReplyCard.vue";

import { mapState } from "vuex";
const dummyData = {
  tweets: [
    {
        "id": 504,
        "UserId": 14,
        "description": "1111",
        "createdAt": "2022-02-26T13:57:17.000Z",
        "updatedAt": "2022-02-26T13:57:17.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Replies": [],
        "Likes": [],
        "likedCount": 0,
        "repliedCount": 0,
        "isLiked": false
    },
    {
        "id": 94,
        "UserId": 14,
        "description": "Dolor magnam sequi repudiandae.",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Replies": [
            {
                "id": 274,
                "UserId": 14,
                "TweetId": 94,
                "comment": "sit soluta veniam",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 284,
                "UserId": 54,
                "TweetId": 94,
                "comment": "Dolorem dolorum quasi deleniti. Maxime ut est similique fuga aut.",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 294,
                "UserId": 14,
                "TweetId": 94,
                "comment": "A dolores et. Vitae sed itaque laborum labore ullam aliquam aut alias. Facilis amet vel autem molestias dolorum. Optio dolorem exercitatione",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            }
        ],
        "Likes": [
            {
                "id": 64,
                "UserId": 34,
                "TweetId": 94,
                "createdAt": "2022-02-26T13:31:33.000Z",
                "updatedAt": "2022-02-26T13:31:33.000Z"
            }
        ],
        "likedCount": 1,
        "repliedCount": 3,
        "isLiked": false
    },
    {
        "id": 74,
        "UserId": 14,
        "description": "Nulla asperiores quibusdam iste quaerat explicabo id dignissimos nulla quo. Culpa aut ut aperiam in enim molestiae dolorem laborum. Quam ab soluta nostrum omnis qui ut consequatur.",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Replies": [
            {
                "id": 214,
                "UserId": 14,
                "TweetId": 74,
                "comment": "Voluptatem sunt facilis voluptatem debitis omnis ea ut. Alias non dolores sit ut accusamus ad modi. Ad cumque at. Deleniti sint ut nostrum v",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 224,
                "UserId": 34,
                "TweetId": 74,
                "comment": "Omnis sint illum dolor dicta saepe nobis.",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 234,
                "UserId": 54,
                "TweetId": 74,
                "comment": "Perspiciatis illo inventore non voluptatem dignissimos. Possimus voluptas non officia. Accusamus eaque amet repellendus est et et voluptatum",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            }
        ],
        "Likes": [
            {
                "id": 84,
                "UserId": 24,
                "TweetId": 74,
                "createdAt": "2022-02-26T13:31:33.000Z",
                "updatedAt": "2022-02-26T13:31:33.000Z"
            }
        ],
        "likedCount": 1,
        "repliedCount": 3,
        "isLiked": false
    },
    {
        "id": 14,
        "UserId": 14,
        "description": "Ad et rerum quis ea ea veniam. Inventore repellat et. Esse amet alias. Ullam excepturi quo voluptatem animi molestiae iure et possimus ut. Vitae autem ipsum accusantium sint voluptatem sed.",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Replies": [
            {
                "id": 34,
                "UserId": 14,
                "TweetId": 14,
                "comment": "Itaque soluta omnis sit. Impedit voluptatum ea vel autem est corrupti voluptatem mollitia dolor. Sit qui voluptatum. Et tenetur a qui est pe",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 44,
                "UserId": 24,
                "TweetId": 14,
                "comment": "Maiores voluptas id.",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 54,
                "UserId": 44,
                "TweetId": 14,
                "comment": "Illum quia illo porro accusantium fuga dolore culpa voluptatum rerum. Ab facilis repudiandae vitae ut recusandae nobis ut similique qui. Sun",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            }
        ],
        "Likes": [],
        "likedCount": 0,
        "repliedCount": 3,
        "isLiked": false
    },
    {
        "id": 24,
        "UserId": 14,
        "description": "Ullam omnis occaecati repudiandae vero a.",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Replies": [
            {
                "id": 64,
                "UserId": 14,
                "TweetId": 24,
                "comment": "Assumenda sed totam. Non non rerum voluptas cupiditate dolores. Iste quaerat itaque quo. Quod temporibus pariatur.\n \rVoluptatem est id in qu",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 74,
                "UserId": 34,
                "TweetId": 24,
                "comment": "Enim ea provident repudiandae. Voluptas illo vitae architecto placeat consectetur voluptas quia in. Officiis consectetur cumque explicabo. M",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 84,
                "UserId": 34,
                "TweetId": 24,
                "comment": "Voluptatem non repellat cupiditate explicabo rerum distinctio possimus quis.\nSed exercitationem alias aut sed minus earum id ut.\nLaboriosam ",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            }
        ],
        "Likes": [],
        "likedCount": 0,
        "repliedCount": 3,
        "isLiked": false
    },
    {
        "id": 34,
        "UserId": 14,
        "description": "Nobis repellendus saepe nobis quibusdam quia ipsa nostrum provident.\nNihil eos error aliquam assumenda qui minima.",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Replies": [
            {
                "id": 94,
                "UserId": 14,
                "TweetId": 34,
                "comment": "Et mollitia nobis error et dolorum qui et consequatur.",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 104,
                "UserId": 14,
                "TweetId": 34,
                "comment": "Necessitatibus doloremque voluptatem sequi. Odio aut rerum eos. Reiciendis ipsam ea voluptatibus porro provident deserunt maiores.\n \rIn nisi",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 114,
                "UserId": 24,
                "TweetId": 34,
                "comment": "Aut enim quos dicta rerum laborum itaque odio qui ut. Sint velit quia excepturi ad dolor doloremque id odio. Exercitationem nam placeat inci",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            }
        ],
        "Likes": [],
        "likedCount": 0,
        "repliedCount": 3,
        "isLiked": false
    },
    {
        "id": 44,
        "UserId": 14,
        "description": "Ducimus veritatis deleniti eligendi voluptatibus non labore.",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Replies": [
            {
                "id": 124,
                "UserId": 14,
                "TweetId": 44,
                "comment": "Quisquam dignissimos qui.",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 134,
                "UserId": 34,
                "TweetId": 44,
                "comment": "Quod molestiae a. Quod rem ut recusandae aut qui et illo. Necessitatibus distinctio dolores eum dolores ratione. Alias nesciunt magni. Ut ne",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 144,
                "UserId": 34,
                "TweetId": 44,
                "comment": "Ut distinctio quas vero molestiae voluptatem sed dolorem sequi.",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            }
        ],
        "Likes": [],
        "likedCount": 0,
        "repliedCount": 3,
        "isLiked": false
    },
    {
        "id": 54,
        "UserId": 14,
        "description": "Neque quam tempora ea minima nemo officiis dolor.",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Replies": [
            {
                "id": 154,
                "UserId": 14,
                "TweetId": 54,
                "comment": "unde tenetur doloremque",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 164,
                "UserId": 44,
                "TweetId": 54,
                "comment": "Natus perspiciatis est.",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 174,
                "UserId": 44,
                "TweetId": 54,
                "comment": "Excepturi labore delectus eos.\nMinus provident deleniti provident qui laudantium.\nEt ratione ducimus voluptate dignissimos id cupiditate et ",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            }
        ],
        "Likes": [],
        "likedCount": 0,
        "repliedCount": 3,
        "isLiked": false
    },
    {
        "id": 84,
        "UserId": 14,
        "description": "Sit voluptas odio quia omnis sunt repudiandae ut aut soluta.",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Replies": [
            {
                "id": 244,
                "UserId": 14,
                "TweetId": 84,
                "comment": "doloremque",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 254,
                "UserId": 14,
                "TweetId": 84,
                "comment": "aliquam ea veritatis",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            },
            {
                "id": 264,
                "UserId": 24,
                "TweetId": 84,
                "comment": "Ex est nulla quo consequatur accusantium accusamus adipisci veritatis. Dignissimos ea aperiam eos assumenda vero omnis. Nihil autem qui libe",
                "createdAt": "2022-02-26T13:31:32.000Z",
                "updatedAt": "2022-02-26T13:31:32.000Z"
            }
        ],
        "Likes": [],
        "likedCount": 0,
        "repliedCount": 3,
        "isLiked": false
    }
]
};
const userDummyData = {
  userData: {
    user: {
    "id": 14,
    "account": "user1",
    "email": "user1@example.com",
    "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
    "name": "user1",
    "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
    "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
    "introduction": "Nihil et error voluptatem incidunt.",
    "role": "user",
    "createdAt": "2022-02-26T13:31:32.000Z",
    "updatedAt": "2022-02-26T13:31:32.000Z",
    "Followings": [
        {
            "id": 24,
            "account": "user2",
            "email": "user2@example.com",
            "password": "$2a$10$Il1etWmTyHTaQthyJ8CCaO0j7aUI1sUa2hF6l70AtY4r1ZULjjSt6",
            "name": "user2",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=19.688300546759187",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=59.69861975665756",
            "introduction": "Aliquam sit cupiditate recusandae error iusto.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "Followship": {
                "followerId": 14,
                "followingId": 24,
                "createdAt": "2022-02-26T13:31:33.000Z",
                "updatedAt": "2022-02-26T13:31:33.000Z"
            }
        }
    ],
    "Followers": [
        {
            "id": 54,
            "account": "user5",
            "email": "user5@example.com",
            "password": "$2a$10$uXcfcRW9/jQrnsd5IN22reCMdvmRqNm97Q8e/D/osjFjK19q3cB/.",
            "name": "user5",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=53.862516895651005",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=30.9884661571197",
            "introduction": "Rerum quidem suscipit itaque harum dicta sapiente.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "Followship": {
                "followerId": 54,
                "followingId": 14,
                "createdAt": "2022-02-26T13:31:33.000Z",
                "updatedAt": "2022-02-26T13:31:33.000Z"
            }
        },
        {
            "id": 44,
            "account": "user4",
            "email": "user4@example.com",
            "password": "$2a$10$pT/Fa9VgpEX5Pv8Zbflnn.Ky59RHIfyhdufbfb8bhLHgMnf5I8X7y",
            "name": "user4",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=85.38506035885851",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=21.01274733805727",
            "introduction": "Debitis veniam ad eos eum voluptas sit.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "Followship": {
                "followerId": 44,
                "followingId": 14,
                "createdAt": "2022-02-26T13:31:33.000Z",
                "updatedAt": "2022-02-26T13:31:33.000Z"
            }
        }
    ],
    "followingCount": 1,
    "follwerCount": 2,
    "isFollowed": false
}
  },
}; //api/user/id這包幾乎包刮全部會用到的資料好像可以用currentuser.id去取這包再帶資料
const DummyData2 = {
  Replies: [
    {
        "id": 4,
        "UserId": 14,
        "TweetId": 4,
        "comment": "Ut qui magnam quia quis reiciendis ipsum qui. Illo quis et error aut distinctio libero soluta ex ratione. Odit autem autem id ut omnis. Assu",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": null
    },
    {
        "id": 14,
        "UserId": 14,
        "TweetId": 4,
        "comment": "Sed impedit exercitationem modi.",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": null
    },
    {
        "id": 34,
        "UserId": 14,
        "TweetId": 14,
        "comment": "Itaque soluta omnis sit. Impedit voluptatum ea vel autem est corrupti voluptatem mollitia dolor. Sit qui voluptatum. Et tenetur a qui est pe",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 14,
            "UserId": 14,
            "description": "Ad et rerum quis ea ea veniam. Inventore repellat et. Esse amet alias. Ullam excepturi quo voluptatem animi molestiae iure et possimus ut. Vitae autem ipsum accusantium sint voluptatem sed.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user1",
                "account": "user1"
            }
        }
    },
    {
        "id": 64,
        "UserId": 14,
        "TweetId": 24,
        "comment": "Assumenda sed totam. Non non rerum voluptas cupiditate dolores. Iste quaerat itaque quo. Quod temporibus pariatur.\n \rVoluptatem est id in qu",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 24,
            "UserId": 14,
            "description": "Ullam omnis occaecati repudiandae vero a.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user1",
                "account": "user1"
            }
        }
    },
    {
        "id": 94,
        "UserId": 14,
        "TweetId": 34,
        "comment": "Et mollitia nobis error et dolorum qui et consequatur.",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 34,
            "UserId": 14,
            "description": "Nobis repellendus saepe nobis quibusdam quia ipsa nostrum provident.\nNihil eos error aliquam assumenda qui minima.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user1",
                "account": "user1"
            }
        }
    },
    {
        "id": 104,
        "UserId": 14,
        "TweetId": 34,
        "comment": "Necessitatibus doloremque voluptatem sequi. Odio aut rerum eos. Reiciendis ipsam ea voluptatibus porro provident deserunt maiores.\n \rIn nisi",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 34,
            "UserId": 14,
            "description": "Nobis repellendus saepe nobis quibusdam quia ipsa nostrum provident.\nNihil eos error aliquam assumenda qui minima.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user1",
                "account": "user1"
            }
        }
    },
    {
        "id": 124,
        "UserId": 14,
        "TweetId": 44,
        "comment": "Quisquam dignissimos qui.",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 44,
            "UserId": 14,
            "description": "Ducimus veritatis deleniti eligendi voluptatibus non labore.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user1",
                "account": "user1"
            }
        }
    },
    {
        "id": 154,
        "UserId": 14,
        "TweetId": 54,
        "comment": "unde tenetur doloremque",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 54,
            "UserId": 14,
            "description": "Neque quam tempora ea minima nemo officiis dolor.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user1",
                "account": "user1"
            }
        }
    },
    {
        "id": 184,
        "UserId": 14,
        "TweetId": 64,
        "comment": "facilis",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": null
    },
    {
        "id": 204,
        "UserId": 14,
        "TweetId": 64,
        "comment": "ab omnis consequatur",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": null
    },
    {
        "id": 214,
        "UserId": 14,
        "TweetId": 74,
        "comment": "Voluptatem sunt facilis voluptatem debitis omnis ea ut. Alias non dolores sit ut accusamus ad modi. Ad cumque at. Deleniti sint ut nostrum v",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 74,
            "UserId": 14,
            "description": "Nulla asperiores quibusdam iste quaerat explicabo id dignissimos nulla quo. Culpa aut ut aperiam in enim molestiae dolorem laborum. Quam ab soluta nostrum omnis qui ut consequatur.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user1",
                "account": "user1"
            }
        }
    },
    {
        "id": 244,
        "UserId": 14,
        "TweetId": 84,
        "comment": "doloremque",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 84,
            "UserId": 14,
            "description": "Sit voluptas odio quia omnis sunt repudiandae ut aut soluta.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user1",
                "account": "user1"
            }
        }
    },
    {
        "id": 254,
        "UserId": 14,
        "TweetId": 84,
        "comment": "aliquam ea veritatis",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 84,
            "UserId": 14,
            "description": "Sit voluptas odio quia omnis sunt repudiandae ut aut soluta.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user1",
                "account": "user1"
            }
        }
    },
    {
        "id": 274,
        "UserId": 14,
        "TweetId": 94,
        "comment": "sit soluta veniam",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 94,
            "UserId": 14,
            "description": "Dolor magnam sequi repudiandae.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user1",
                "account": "user1"
            }
        }
    },
    {
        "id": 294,
        "UserId": 14,
        "TweetId": 94,
        "comment": "A dolores et. Vitae sed itaque laborum labore ullam aliquam aut alias. Facilis amet vel autem molestias dolorum. Optio dolorem exercitatione",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 94,
            "UserId": 14,
            "description": "Dolor magnam sequi repudiandae.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user1",
                "account": "user1"
            }
        }
    },
    {
        "id": 464,
        "UserId": 14,
        "TweetId": 154,
        "comment": "Ea soluta sint facilis repellat quisquam.\nEarum veritatis veniam architecto esse nobis voluptates quod et eos.\nOdio aut et eum accusantium n",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 154,
            "UserId": 24,
            "description": "Magnam quidem vel rerum quas ut ipsa sed. Officia minus laudantium. Ut temporibus delectus. Et est totam error sed veniam. Soluta blanditiis ipsa et sed ex numquam facilis reiciendis.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user2",
                "account": "user2"
            }
        }
    },
    {
        "id": 624,
        "UserId": 14,
        "TweetId": 204,
        "comment": "suscipit deserunt aut",
        "createdAt": "2022-02-26T13:31:33.000Z",
        "updatedAt": "2022-02-26T13:31:33.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 204,
            "UserId": 34,
            "description": "Corporis enim natus sapiente nostrum at vel tempora blanditiis cupiditate. Ut ut qui qui. Et velit veniam cupiditate.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user3",
                "account": "user3"
            }
        }
    },
    {
        "id": 794,
        "UserId": 14,
        "TweetId": 264,
        "comment": "inventore quia in",
        "createdAt": "2022-02-26T13:31:33.000Z",
        "updatedAt": "2022-02-26T13:31:33.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 264,
            "UserId": 34,
            "description": "Perspiciatis quas dolor magni qui velit eum.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user3",
                "account": "user3"
            }
        }
    },
    {
        "id": 824,
        "UserId": 14,
        "TweetId": 274,
        "comment": "qui",
        "createdAt": "2022-02-26T13:31:33.000Z",
        "updatedAt": "2022-02-26T13:31:33.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 274,
            "UserId": 34,
            "description": "Necessitatibus libero nam dolor voluptatem praesentium.\nDelectus voluptatem quaerat nam totam est ut expedita.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user3",
                "account": "user3"
            }
        }
    },
    {
        "id": 854,
        "UserId": 14,
        "TweetId": 284,
        "comment": "Occaecati quia blanditiis unde iure et quaerat sunt. Sit veritatis et nisi sint. Deleniti sapiente et sed eos.",
        "createdAt": "2022-02-26T13:31:33.000Z",
        "updatedAt": "2022-02-26T13:31:33.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 284,
            "UserId": 34,
            "description": "Odio at quod tempora itaque.",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user3",
                "account": "user3"
            }
        }
    },
    {
        "id": 894,
        "UserId": 14,
        "TweetId": 294,
        "comment": "Vel voluptatibus voluptas quae.",
        "createdAt": "2022-02-26T13:31:33.000Z",
        "updatedAt": "2022-02-26T13:31:33.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 294,
            "UserId": 34,
            "description": "et",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user3",
                "account": "user3"
            }
        }
    },
    {
        "id": 1194,
        "UserId": 14,
        "TweetId": 394,
        "comment": "qui voluptatum est",
        "createdAt": "2022-02-26T13:31:33.000Z",
        "updatedAt": "2022-02-26T13:31:33.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 394,
            "UserId": 44,
            "description": "quae",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user4",
                "account": "user4"
            }
        }
    },
    {
        "id": 1214,
        "UserId": 14,
        "TweetId": 404,
        "comment": "Sit aperiam illo labore facere quia animi.",
        "createdAt": "2022-02-26T13:31:33.000Z",
        "updatedAt": "2022-02-26T13:31:33.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 404,
            "UserId": 54,
            "description": "ut",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user5",
                "account": "user5"
            }
        }
    },
    {
        "id": 1274,
        "UserId": 14,
        "TweetId": 424,
        "comment": "Exercitationem fugit sequi qui dolor officia mollitia.",
        "createdAt": "2022-02-26T13:31:33.000Z",
        "updatedAt": "2022-02-26T13:31:33.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
            "name": "user1",
            "avatar": "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
            "cover": "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
            "introduction": "Nihil et error voluptatem incidunt.",
            "role": "user",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        "Tweet": {
            "id": 424,
            "UserId": 54,
            "description": "dolor dolor doloremque",
            "createdAt": "2022-02-26T13:31:32.000Z",
            "updatedAt": "2022-02-26T13:31:32.000Z",
            "User": {
                "name": "user5",
                "account": "user5"
            }
        }
    }
]
};
const dummyDataLike= {
    likes :[
  {
    "id": 4,
    "UserId": 14,
    "TweetId": 444,
    "createdAt": "2022-02-26T13:31:33.000Z",
    "updatedAt": "2022-02-26T13:31:33.000Z",
    "Tweet": {
      "id": 444,
      "UserId": 54,
      "description": "Quo ratione sit distinctio sint. Culpa et nostrum autem consectetur perferendis. Assumenda magni quis velit dolores dolores optio et temporibus porro. Fugiat similique placeat id sapiente porro explicabo esse. Eius aut totam numquam quod doloremque debitis maiores quia. Aperiam quaerat sequi.\n \rAsperiores odit voluptatem et ut nam. Et eaque voluptatum. Non labore suscipit corrupti blanditiis eligendi ut. Quod asperiores iste perspiciatis. Enim pariatur et.\n \rVitae non nihil sit nulla non. Necessitatibus non quaerat nihil animi. Hic dolores sint ratione iusto omnis molestias magnam debitis molestiae. Quibusdam quae laborum id et odit eaque sit. Illum eos sapiente earum minus atque assumenda. Dolor laboriosam vero et illo molestias.",
      "createdAt": "2022-02-26T13:31:32.000Z",
      "updatedAt": "2022-02-26T13:31:32.000Z",
      "User": {
        "id": 54,
        "account": "user5",
        "email": "user5@example.com",
        "password": "$2a$10$uXcfcRW9/jQrnsd5IN22reCMdvmRqNm97Q8e/D/osjFjK19q3cB/.",
        "name": "user5",
        "avatar": "https://loremflickr.com/g/320/240/people/?random=53.862516895651005",
        "cover": "https://loremflickr.com/g/600/240/shop/?random=30.9884661571197",
        "introduction": "Rerum quidem suscipit itaque harum dicta sapiente.",
        "role": "user",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z"
      },
      "Replies": [
        {
          "id": 1324,
          "UserId": 54,
          "TweetId": 444,
          "comment": "voluptatem animi reiciendis",
          "createdAt": "2022-02-26T13:31:33.000Z",
          "updatedAt": "2022-02-26T13:31:33.000Z"
        },
        {
          "id": 1334,
          "UserId": 34,
          "TweetId": 444,
          "comment": "Excepturi porro voluptates unde nisi.",
          "createdAt": "2022-02-26T13:31:33.000Z",
          "updatedAt": "2022-02-26T13:31:33.000Z"
        },
        {
          "id": 1344,
          "UserId": 24,
          "TweetId": 444,
          "comment": "Optio quas est doloremque dignissimos officia modi aut quasi. Ut aspernatur aliquid. Quia dicta ab dolorum reiciendis cum odio et nulla.\n \rF",
          "createdAt": "2022-02-26T13:31:33.000Z",
          "updatedAt": "2022-02-26T13:31:33.000Z"
        }
      ],
      "Likes": [
        {
          "id": 4,
          "UserId": 14,
          "TweetId": 444,
          "createdAt": "2022-02-26T13:31:33.000Z",
          "updatedAt": "2022-02-26T13:31:33.000Z"
        },
        {
          "id": 14,
          "UserId": 24,
          "TweetId": 444,
          "createdAt": "2022-02-26T13:31:33.000Z",
          "updatedAt": "2022-02-26T13:31:33.000Z"
        }
      ]
    }
  },
  {
    "id": 24,
    "UserId": 14,
    "TweetId": 154,
    "createdAt": "2022-02-26T13:31:33.000Z",
    "updatedAt": "2022-02-26T13:31:33.000Z",
    "Tweet": {
      "id": 154,
      "UserId": 24,
      "description": "Magnam quidem vel rerum quas ut ipsa sed. Officia minus laudantium. Ut temporibus delectus. Et est totam error sed veniam. Soluta blanditiis ipsa et sed ex numquam facilis reiciendis.",
      "createdAt": "2022-02-26T13:31:32.000Z",
      "updatedAt": "2022-02-26T13:31:32.000Z",
      "User": {
        "id": 24,
        "account": "user2",
        "email": "user2@example.com",
        "password": "$2a$10$Il1etWmTyHTaQthyJ8CCaO0j7aUI1sUa2hF6l70AtY4r1ZULjjSt6",
        "name": "user2",
        "avatar": "https://loremflickr.com/g/320/240/people/?random=19.688300546759187",
        "cover": "https://loremflickr.com/g/600/240/shop/?random=59.69861975665756",
        "introduction": "Aliquam sit cupiditate recusandae error iusto.",
        "role": "user",
        "createdAt": "2022-02-26T13:31:32.000Z",
        "updatedAt": "2022-02-26T13:31:32.000Z"
      },
      "Replies": [
        {
          "id": 454,
          "UserId": 24,
          "TweetId": 154,
          "comment": "Nihil inventore voluptatem itaque laboriosam numquam dolores et ullam.\nOptio quidem quis doloribus est illo voluptatem reiciendis corrupti m",
          "createdAt": "2022-02-26T13:31:32.000Z",
          "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        {
          "id": 464,
          "UserId": 14,
          "TweetId": 154,
          "comment": "Ea soluta sint facilis repellat quisquam.\nEarum veritatis veniam architecto esse nobis voluptates quod et eos.\nOdio aut et eum accusantium n",
          "createdAt": "2022-02-26T13:31:32.000Z",
          "updatedAt": "2022-02-26T13:31:32.000Z"
        },
        {
          "id": 474,
          "UserId": 54,
          "TweetId": 154,
          "comment": "Deserunt vitae nulla. Unde eum qui nisi. Occaecati quia sed similique sequi enim repellendus repellendus. Atque eos blanditiis dolorem aliqu",
          "createdAt": "2022-02-26T13:31:32.000Z",
          "updatedAt": "2022-02-26T13:31:32.000Z"
        }
      ],
      "Likes": [
        {
          "id": 24,
          "UserId": 14,
          "TweetId": 154,
          "createdAt": "2022-02-26T13:31:33.000Z",
          "updatedAt": "2022-02-26T13:31:33.000Z"
        }
      ]
    }
  }
]
}

export default {
  components: {
    NavBar,
    Popular,
    UserCard,
    TweetCard,
    ReplyCard,
  },
  data() {
    return {
      tweets: [],
      likeTweets:[],
      replys: [],
      currentUserData: {
        id: -1,
        account: "",
        name: "",
        email: "",
        avatar: "",
        cover: "",
        introduction: "",
        followingCount: -1,
        follwerCount: -1,
      },
      whichPage: true, //true代表個人false代表他人
      tabNow: 1, //1推文 2回復 3喜歡
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    fetchTweets() {
      // todo: 串接 API 用currentuser.id取出currentuser詳細資料
      this.tweets = dummyData.tweets;
      this.replys = DummyData2.Replies;
      this.likeTweets = dummyDataLike.likes.map(like=>like.Tweet)
      this.currentUserData = {
        id: userDummyData.userData.user.id,
        account: userDummyData.userData.user.account,
        name: userDummyData.userData.user.name,
        email: userDummyData.userData.user.email,
        avatar: userDummyData.userData.user.avatar,
        cover: userDummyData.userData.user.cover,
        introduction: userDummyData.userData.user.introduction,
        followingCount: userDummyData.userData.user.followingCount,
        follwerCount: userDummyData.userData.user.follwerCount,
      };
    },
  },
  created() {
    this.fetchTweets();
  },
};
</script>

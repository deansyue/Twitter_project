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
          <ReplyCard :tweet-card="reply" />
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
import TweetCard from '../components/TweetCard.vue'
import ReplyCard from '../components/ReplyCard.vue'

const dummyData = {
  tweets: [
    {
      id: 1,
      UserId: 2,
      description: "a",
      createdAt: "2022-02-23T23:19:20.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      User: {
        id: 2,
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
        name: "user1",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
        introduction: "Culpa minus ea ullam.",
        role: "user",
        createdAt: "2022-02-24T08:19:30.000Z",
        updatedAt: "2022-02-24T08:19:30.000Z",
      },
      Replies: [
        {
          id: 3,
          UserId: 4,
          TweetId: 1,
          comment:
            "Quasi modi sint fuga recusandae. Et et ducimus consectetur soluta. Deleniti inventore error possimus nesciunt itaque ut sunt.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 2,
          UserId: 2,
          TweetId: 1,
          comment: "odit",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 1,
          UserId: 2,
          TweetId: 1,
          comment:
            "Maiores totam nobis corrupti dolores qui et est consectetur hic. Necessitatibus rem quidem blanditiis iusto reiciendis ipsam id architecto. ",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
      ],
      Likes: [],
    },
    {
      id: 2,
      UserId: 2,
      description:
        "Ipsam expedita natus accusamus eos expedita doloribus qui veniam est. Mollitia est eos et ratione eaque distinctio. Eum magnam dolor. Odio nobis minus at cum illum et ex dignissimos.",
      createdAt: "2022-02-22T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      User: {
        id: 2,
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
        name: "user1",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
        introduction: "Culpa minus ea ullam.",
        role: "user",
        createdAt: "2022-02-24T08:19:30.000Z",
        updatedAt: "2022-02-24T08:19:30.000Z",
      },
      Replies: [
        {
          id: 6,
          UserId: 5,
          TweetId: 2,
          comment:
            "Commodi optio quidem sint est laudantium quia reprehenderit libero consequatur.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 5,
          UserId: 3,
          TweetId: 2,
          comment:
            "Facilis rerum nesciunt veniam incidunt dolor.\nIusto facere omnis optio rerum mollitia odit est.\nUt odio autem molestiae debitis veritatis to",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 4,
          UserId: 2,
          TweetId: 2,
          comment: "Nulla est veniam.\nEius nihil ex.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
      ],
      Likes: [],
    },
    {
      id: 3,
      UserId: 2,
      description: "ut",
      createdAt: "2022-02-23T20:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      User: {
        id: 2,
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
        name: "user1",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
        introduction: "Culpa minus ea ullam.",
        role: "user",
        createdAt: "2022-02-24T08:19:30.000Z",
        updatedAt: "2022-02-24T08:19:30.000Z",
      },
      Replies: [
        {
          id: 9,
          UserId: 4,
          TweetId: 3,
          comment: "Veniam libero non ducimus et.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 8,
          UserId: 2,
          TweetId: 3,
          comment: "Ex vel iure eaque quae in non cum officiis.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 7,
          UserId: 2,
          TweetId: 3,
          comment:
            "Blanditiis ut consequatur et et cumque. Amet amet minus eum. Quas vel rerum. Quibusdam et consequatur.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
      ],
      Likes: [],
    },
    {
      id: 4,
      UserId: 2,
      description:
        "Nobis debitis delectus dolore et. Aut reiciendis consequuntur ad cumque debitis ea velit voluptatem ipsam. Vel vel quisquam rerum consequatur sit.\n \rQuaerat voluptatum qui quas ut magni fugiat aut. Quis debitis ut non. Consequatur reprehenderit labore inventore molestias cumque qui. Et consequatur accusamus quo esse ut minima aliquid rem. Maiores et molestiae quidem aut magnam. Vero provident asperiores aut soluta vitae quis molestiae laboriosam fugiat.\n \rEaque atque aut. Debitis laboriosam aut accusamus molestias accusamus. Sequi ut laboriosam ipsam quibusdam tempore sit ut dolor ut.",
      createdAt: "2022-02-24T11:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      User: {
        id: 2,
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
        name: "user1",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
        introduction: "Culpa minus ea ullam.",
        role: "user",
        createdAt: "2022-02-24T08:19:30.000Z",
        updatedAt: "2022-02-24T08:19:30.000Z",
      },
      Replies: [
        {
          id: 12,
          UserId: 5,
          TweetId: 4,
          comment:
            "Molestiae et recusandae in facere eius. Maxime officiis commodi sed perferendis molestias. Vero veniam explicabo quod enim ut recusandae. Co",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 11,
          UserId: 2,
          TweetId: 4,
          comment: "qui ullam itaque",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 10,
          UserId: 2,
          TweetId: 4,
          comment: "optio",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
      ],
      Likes: [],
    },
    {
      id: 5,
      UserId: 2,
      description:
        "Et ab quia id aliquid. Ut aut molestiae quidem quod ex quo facilis minima. Consequatur qui non et voluptatibus. Laudantium minima eveniet iusto illum fuga quod. Animi sed omnis aut eaque dolorem. Cum veniam repellendus eius necessitatibus blanditiis non reprehenderit quo.\n \rNulla officia sit quibusdam vitae iste libero. Voluptates est alias. Ut est nesciunt commodi. Mollitia sunt odit eius sit voluptatibus laudantium. Earum magni qui accusantium minus sit consequatur similique. Qui dolorem voluptatibus similique.\n \rVoluptatem quibusdam esse facere est est ipsum. Nesciunt quia et. Quis asperiores eos.",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      User: {
        id: 2,
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
        name: "user1",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
        introduction: "Culpa minus ea ullam.",
        role: "user",
        createdAt: "2022-02-24T08:19:30.000Z",
        updatedAt: "2022-02-24T08:19:30.000Z",
      },
      Replies: [
        {
          id: 15,
          UserId: 2,
          TweetId: 5,
          comment: "Temporibus in assumenda amet.\nArchitecto velit enim.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 14,
          UserId: 5,
          TweetId: 5,
          comment: "assumenda quisquam consequuntur",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 13,
          UserId: 2,
          TweetId: 5,
          comment: "necessitatibus sit quod",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
      ],
      Likes: [
        {
          id: 3,
          UserId: 4,
          TweetId: 5,
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
      ],
    },
    {
      id: 6,
      UserId: 2,
      description:
        "Et et dolor in sit qui pariatur aliquam.\nVeritatis in corrupti ipsa tempore cumque reiciendis est voluptatem dignissimos.\nConsequatur ea earum tempora.\nVeniam sit distinctio.",
      createdAt: "2022-02-01T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      User: {
        id: 2,
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
        name: "user1",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
        introduction: "Culpa minus ea ullam.",
        role: "user",
        createdAt: "2022-02-24T08:19:30.000Z",
        updatedAt: "2022-02-24T08:19:30.000Z",
      },
      Replies: [
        {
          id: 18,
          UserId: 4,
          TweetId: 6,
          comment: "Est quia consequatur velit vitae.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 17,
          UserId: 3,
          TweetId: 6,
          comment: "ut debitis facere",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 16,
          UserId: 2,
          TweetId: 6,
          comment:
            "Qui voluptate dicta est harum ea minus numquam accusantium.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
      ],
      Likes: [],
    },
    {
      id: 7,
      UserId: 2,
      description: "velit in perferendis",
      createdAt: "2022-02-24T11:11:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      User: {
        id: 2,
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
        name: "user1",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
        introduction: "Culpa minus ea ullam.",
        role: "user",
        createdAt: "2022-02-24T08:19:30.000Z",
        updatedAt: "2022-02-24T08:19:30.000Z",
      },
      Replies: [
        {
          id: 21,
          UserId: 3,
          TweetId: 7,
          comment: "aut",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 20,
          UserId: 4,
          TweetId: 7,
          comment:
            "Placeat accusantium veritatis qui. Ipsam consequatur illum ea iure accusamus. Sapiente fugit alias totam eum dolorem molestiae. Deserunt omn",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 19,
          UserId: 2,
          TweetId: 7,
          comment: "quia",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
      ],
      Likes: [],
    },
    {
      id: 8,
      UserId: 2,
      description: "expedita sed quos",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      User: {
        id: 2,
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
        name: "user1",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
        introduction: "Culpa minus ea ullam.",
        role: "user",
        createdAt: "2022-02-24T08:19:30.000Z",
        updatedAt: "2022-02-24T08:19:30.000Z",
      },
      Replies: [
        {
          id: 24,
          UserId: 3,
          TweetId: 8,
          comment:
            "Quia et modi nostrum velit quas. Id facere dolore eius est delectus nesciunt.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 23,
          UserId: 6,
          TweetId: 8,
          comment:
            "Explicabo quasi voluptatem aut a quaerat voluptatum mollitia qui optio.\nVoluptates mollitia maiores fugiat illum eligendi aut.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 22,
          UserId: 2,
          TweetId: 8,
          comment: "dignissimos eum eius",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
      ],
      Likes: [],
    },
    {
      id: 9,
      UserId: 2,
      description:
        "Nisi enim fuga maxime ratione commodi enim. In earum blanditiis quis facilis quasi quo sit vitae facilis. Rerum ipsa non praesentium corrupti error voluptatem et iure. Et consectetur nam cupiditate vel in perferendis aut dolorum sint. Perspiciatis voluptas iste. Quas perspiciatis sint.\n \rDolores vero omnis laboriosam aliquam quasi in dolor repellat. Distinctio facilis perferendis officia. Saepe architecto neque voluptatem sed. Pariatur facilis cupiditate et ratione quaerat quaerat officia culpa voluptas. Quis aut impedit in.\n \rSunt quasi dolores. Perspiciatis iure dolorem quaerat quia totam ut. Perferendis ut consequatur ab.",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      User: {
        id: 2,
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
        name: "user1",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
        introduction: "Culpa minus ea ullam.",
        role: "user",
        createdAt: "2022-02-24T08:19:30.000Z",
        updatedAt: "2022-02-24T08:19:30.000Z",
      },
      Replies: [
        {
          id: 27,
          UserId: 2,
          TweetId: 9,
          comment:
            "Sunt omnis illum autem eum excepturi. Explicabo unde nemo veritatis dolore voluptatem beatae. Quis assumenda labore eum vel cupiditate itaqu",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 26,
          UserId: 3,
          TweetId: 9,
          comment: "Quis est ut vel et.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 25,
          UserId: 2,
          TweetId: 9,
          comment:
            "Sit aliquam sapiente asperiores dignissimos est sunt id esse. Nostrum fugit repellat consequuntur. Nihil sint qui ut animi sapiente et dicta",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
      ],
      Likes: [],
    },
    {
      id: 10,
      UserId: 2,
      description: "Qui perspiciatis placeat.",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      User: {
        id: 2,
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
        name: "user1",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
        introduction: "Culpa minus ea ullam.",
        role: "user",
        createdAt: "2022-02-24T08:19:30.000Z",
        updatedAt: "2022-02-24T08:19:30.000Z",
      },
      Replies: [
        {
          id: 30,
          UserId: 5,
          TweetId: 10,
          comment: "Aliquam sit nostrum eius labore officiis velit.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 29,
          UserId: 5,
          TweetId: 10,
          comment: "sint in doloremque",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
        {
          id: 28,
          UserId: 2,
          TweetId: 10,
          comment: "Rerum tempora nobis id.",
          createdAt: "2022-02-24T08:19:31.000Z",
          updatedAt: "2022-02-24T08:19:31.000Z",
        },
      ],
      Likes: [],
    },
  ],
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
      id: 1,
      UserId: 2,
      TweetId: 1,
      comment:
        "Maiores totam nobis corrupti dolores qui et est consectetur hic. Necessitatibus rem quidem blanditiis iusto reiciendis ipsam id architecto. ",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 1,
        UserId: 2,
        description: "a",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
      }
    },
    {
      id: 2,
      UserId: 2,
      TweetId: 1,
      comment: "odit",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 1,
        UserId: 2,
        description: "a",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
      }
    },
    {
      id: 3,
      UserId: 4,
      TweetId: 1,
      comment:
        "Quasi modi sint fuga recusandae. Et et ducimus consectetur soluta. Deleniti inventore error possimus nesciunt itaque ut sunt.",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 1,
        UserId: 2,
        description: "a",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
      }
    },
    {
      id: 4,
      UserId: 2,
      TweetId: 2,
      comment: "Nulla est veniam.\nEius nihil ex.",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 2,
        UserId: 2,
        description:
          "Ipsam expedita natus accusamus eos expedita doloribus qui veniam est. Mollitia est eos et ratione eaque distinctio. Eum magnam dolor. Odio nobis minus at cum illum et ex dignissimos.",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
      }
    },
    {
      id: 5,
      UserId: 2,
      TweetId: 1,
      comment:
        "Maiores totam nobis corrupti dolores qui et est consectetur hic. Necessitatibus rem quidem blanditiis iusto reiciendis ipsam id architecto. ",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 1,
        UserId: 2,
        description: "a",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
      }
    },
    {
      id: 6,
      UserId: 2,
      TweetId: 1,
      comment: "odit",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 1,
        UserId: 2,
        description: "a",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
      }
    },
    {
      id: 7,
      UserId: 4,
      TweetId: 1,
      comment:
        "Quasi modi sint fuga recusandae. Et et ducimus consectetur soluta. Deleniti inventore error possimus nesciunt itaque ut sunt.",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 1,
        UserId: 2,
        description: "a",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
      }
    },
    {
      id:8,
      UserId: 2,
      TweetId: 2,
      comment: "Nulla est veniam.\nEius nihil ex.",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 2,
        UserId: 2,
        description:
          "Ipsam expedita natus accusamus eos expedita doloribus qui veniam est. Mollitia est eos et ratione eaque distinctio. Eum magnam dolor. Odio nobis minus at cum illum et ex dignissimos.",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
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
    ReplyCard
  },
  data() {
    return {
      tweets: [],
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
        isFollowed: ""
      },
      whichPage: false, //true代表個人false代表他人
      tabNow: 1, //1推文 2回復 3喜歡
    };
  },

  methods: {
    fetchTweets() {
      // todo: 串接 API 用currentuser.id取出currentuser詳細資料
      this.tweets = dummyData.tweets;
      this.replys = DummyData2.Replies;
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
        isFollowed: userDummyData.userData.user.isFollowed,
      };
    },
  },
  created() {
    this.fetchTweets();
  },
};
</script>
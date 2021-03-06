import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { userName, email, nickName, bio, avatar, storyImg, storeImg, charHomeImg, tag1, tag2, tag3 } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { userName, email, nickName, bio, avatar, storyImg, storeImg, charHomeImg, tag1, tag2, tag3 }
      });
    }
  }
};

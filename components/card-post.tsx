import Post from "@/models/post";

interface Author {
    _id: string;
    firstname: string;
    lastname: string;
    picture: string;
    economy: number;
}

interface Post {
    _id: string;
    pictureBefore: string;
    pictureAfter: string;
    likes: number;
}

interface CardPostProps {
    post: Post;
    author: Author;
}

export default function CardPost({ post, author }: CardPostProps) {
    return (
        <div className="w-full max-w-2xl p-4 bg-[#D2EDFF] rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <img 
                        src={author.picture} 
                        alt="Profile Picture" 
                        className="w-12 h-12 rounded-full object-cover" 
                        loading="lazy"
                        width={48}
                        height={48}
                    />
                    <div>
                        <h1 className="font-semibold">{author.firstname} {author.lastname}</h1>
                        <p className="text-xs text-gray-500">A économiser {author.economy ? author.economy : 0}% de Co2 !</p>
                    </div>
                    <div className="flex flex-col items-end justify-center w-20">
                        <p>{post.likes ? post.likes : 0}</p> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64"><circle cx="19.498" cy="27.75" r="5" fill="currentColor"/><circle cx="44.498" cy="27.75" r="5" fill="currentColor"/><path fill="currentColor" d="M57.148 26.452C56.717 9.571 44.303 2 31.998 2C19.695 2 7.281 9.571 6.848 26.452C3.525 26.897 2 29.661 2 32.244c-.002 1.532.494 2.95 1.396 3.995c.627.729 1.719 1.576 3.482 1.803c.422 4.775 4.146 10.805 12.801 13.799c.139.154.291.297.441.441C21.18 57.807 26.1 62 31.998 62c5.902 0 10.82-4.195 11.879-9.719c.15-.145.303-.287.441-.441c8.654-2.994 12.379-9.023 12.801-13.801C60.465 37.607 62 34.834 62 32.245c0-2.584-1.525-5.348-4.852-5.793m-25.15 34.085c-5.879 0-10.645-4.689-10.645-10.477c0-4.451 2.824-5.076 6.801-5.129c.07-.549.494-.98 1.029-.98h5.631c.535 0 .959.432 1.027.98c3.977.053 6.803.68 6.803 5.129c.001 5.788-4.767 10.477-10.646 10.477m12.084-10.76c-.141-5.408-4.143-6.154-7.045-6.279c-.998-1.475-2.873-2.475-5.039-2.475c-2.162 0-4.039 1-5.037 2.475c-2.902.125-6.904.871-7.045 6.279c-1.107-1.666-1.707-3.695-1.707-6.057c0-3.902 1.523-4.666 4.156-4.666c1.129 0 2.469.154 3.887.318c1.744.203 3.721.432 5.785.432c2.066 0 4.039-.229 5.781-.432c1.408-.164 2.738-.318 3.857-.318c2.668 0 4.113.744 4.113 4.666c.001 2.362-.599 4.389-1.706 6.057m12.111-13.631h-.969v.975c0 3.807-2.6 8.805-9.039 11.865c.691-1.551 1.055-3.316 1.055-5.266c0-4.297-1.664-6.129-5.564-6.129c-1.203 0-2.572.158-4.023.328c-1.703.197-3.633.422-5.615.422c-1.98 0-3.914-.225-5.621-.422c-1.459-.168-2.84-.328-4.051-.328c-2.611 0-5.609.697-5.609 6.129c0 1.949.365 3.715 1.057 5.266c-6.441-3.061-9.041-8.059-9.041-11.865v-.975h-.968c-1.275 0-2.268-.4-2.949-1.189c-.594-.689-.92-1.652-.92-2.712c0-1.887 1.016-3.903 3.869-3.903h.967v-.976c0-9.115 3.484-15.126 8.346-18.774c3.682 4.431 7.59 7.056 15.85 7.067c-3.871-2.927-1.936-6.83-1.936-6.83s7.742 4.878 14.516 2.927c0 0-3.871-.976-4.838-3.902c0 0 2.891.727 5.551.294c5.184 3.596 8.965 9.72 8.965 19.218v.976h.969c2.854 0 3.871 2.017 3.871 3.903c-.002 1.886-1.019 3.901-3.873 3.901"/><path fill="currentColor" d="M35.877 46.842h-.008v.863c0 .619-.473 1.123-1.055 1.123h-5.631c-.584 0-1.057-.504-1.057-1.123v-.863h-.008c-2.414 0-4.162.451-4.162 3.219c0 4.115 3.861 6.934 8.041 6.934c4.182 0 8.043-2.818 8.043-6.934c.001-2.768-1.749-3.219-4.163-3.219m-.24 7.789c-1.133.188-2.34.295-3.639.295c-1.297 0-2.504-.107-3.637-.295c-1.705-.912-2.953-2.484-2.953-4.57c0-.93.07-1.48 1.355-1.676c.291 1.098 1.266 1.908 2.42 1.908h.293a6.7 6.7 0 0 0 2.521.486a6.7 6.7 0 0 0 2.523-.486h.293c1.154 0 2.127-.809 2.418-1.906c.34.053.65.137.871.273c.146.09.486.301.486 1.4c.002 2.086-1.246 3.659-2.951 4.571m.541-19.818h-8.359c-2.089 0 0 2.998 4.18 2.998c4.179-.002 6.271-2.998 4.179-2.998"/></svg>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-medium mb-2">Before</h2>
                    <img 
                        src={post.pictureBefore} 
                        alt="Picture Before" 
                        className="w-full h-48 object-cover rounded-lg" 
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-medium mb-2">After</h2>
                    <img 
                        src={post.pictureAfter} 
                        alt="Picture After" 
                        className="w-full h-48 object-cover rounded-lg" 
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}

export { CardPost };


import { Users } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Bubble,
  BubbleContent,
} from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";

const StudentConvo = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#eef5fc] to-white text-gray-900 border-b border-gray-100 flex justify-center">
      <div className="w-full px-6 md:px-12 max-w-3xl flex flex-col gap-8">

        {/* Student Message */}
        <Message align="end">
          <MessageAvatar className="flex flex-col items-center gap-1">
            <span className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">Student</span>
            <Avatar className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 border border-slate-200 shadow-sm">
              <AvatarFallback className="bg-transparent">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
              </AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble>
              <BubbleContent className="text-sm sm:text-base font-semibold font-body leading-relaxed bg-white text-slate-800 shadow-sm border border-slate-200">
                Kriscap sir, what makes K.E. different from others?
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>

        {/* Kriscap Sir Message */}
        <Message>
          <MessageAvatar className="flex flex-col items-center gap-1">
            <span className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">Kriscap</span>
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-amber-400 shadow-md bg-white">
              <AvatarImage
                src="https://ui-avatars.com/api/?name=Kriscap+Sir&background=random"
                alt="Kriscap Sir"
                className="object-cover object-top"
              />
              <AvatarFallback>KS</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent className="text-sm sm:text-base font-semibold font-body leading-relaxed bg-white text-slate-800 shadow-sm border border-slate-200">
                At K.E., we don't just give degrees; we build careers. We train you to leave behind odd jobs and step into a dignified, professional life. Here, education means employment.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>

      </div>
    </section>
  );
};

export default StudentConvo;
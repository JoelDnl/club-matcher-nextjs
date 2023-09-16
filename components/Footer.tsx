import { SocialMedia } from "@/data/SocialMediaData";

export default function Footer() {
  return (
    <>
      <hr className="h-px my-8 bg-slate-200 border-0"></hr>
      <div className="flex flex-col sm:flex-row sm:justify-between mx-auto px-8 w-11/12 sm:max-w-6xl sm:pb-6 sm:space-x-8">
        <div className="text-center sm:text-left w-full">
          <h3 className="font-bold">USC Main Office</h3>
          <h4 className="font-normal">
            Room 340, UCC Building
            <br />
            Western University
            <br />
            London, ON. N6A 3K7
          </h4>
        </div>
        <div className="inline-flex items-center justify-center sm:justify-end my-8 gap-2 mx-auto w-full">
          {SocialMedia.map((link) => {
            return (
              <a
                key={link.key}
                href={link.href}
                type="button"
                target="_blank"
                className="text-black text-3xl"
              >
                {link.icon}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

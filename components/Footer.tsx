import { SocialMedia } from "@/data/SocialMediaData";

export default function Footer() {
  return (
    <>
      <hr className="h-px my-8 sm:my-8 bg-slate-200 border-0"></hr>
      <div className="flex flex-col sm:flex-row justify-between sm:mx-auto px-8 w-11/12 sm:max-w-6xl sm:pb-6 space-x-8">
        <div className="text-center sm:text-left">
          <h3 className="font-bold">USC Main Office</h3>
          <h4 className="font-normal">
            Room 340, UCC Building
            <br />
            Western University
            <br />
            London, ON. N6A 3K7
          </h4>
        </div>
        <div className="flex justify-center my-8 space-x-4 first:space-x-0">
          {SocialMedia.map((link) => {
            return (
              <div key={link.key}>
                <a
                  href={link.href}
                  type="button"
                  target="_blank"
                  className="text-black text-3xl"
                >
                  {link.icon}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

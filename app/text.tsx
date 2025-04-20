<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
{services.map((service, index) => (
  <motion.div
    key={index}

    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-2xl transform group-hover:scale-102 transition-all duration-300 -z-10"></div>
    <div className="absolute inset-0 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
      <motion.div
        className={`absolute -inset-[150%] bg-gradient-to-r ${service.color} opacity-30 blur-3xl`}

      />
    </div>

    <div className="relative items-center flex flex-col p-8 md:p-10 z-10">


      <h3 className={`text-2xl md:text-3xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r ${service.color}`}>
        {service.title}
      </h3>

      <ul className="mt-8 md:mt-10 text-lg md:text-xl font-medium space-y-5 md:space-y-6 text-gray-200">
        {service.list.map((item, idx) => (
          <motion.li
            key={idx}
            className="flex items-center group/item cursor-pointer transition-all duration-300 "
            whileHover={{ scale: 1.02 }}
          >
            <span className="mr-3 opacity-80 group-hover/item:opacity-100">{item}</span>
          </motion.li>
        ))}
      </ul>

      {/* Updated "Learn More" to use Link */}
      <Link href={service.link} passHref>
        <motion.div
          className="mt-10 md:mt-12 inline-flex items-center text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
          whileHover={{ x: 5 }}
        >
          Learn more <ArrowRight className="ml-2 w-4 h-4" />
        </motion.div>
      </Link>
    </div>
  </motion.div>
))}
</div>
